import { FormControl, FormLabel, Input, FormErrorMessage, Select, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CityDto, CreateModelDto, NeuralModelService } from '../../service'

export interface NeuralModelFormProps {
    cityList: CityDto[]
    defaultCityId?: number
}

export const NeuralModelForm: React.FC<NeuralModelFormProps> = ({ cityList, defaultCityId }: NeuralModelFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateModelDto>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<CreateModelDto> = data => {
        NeuralModelService.createModel(data).then(() => {
            navigate(`/city/${data.city}`)
        })
    }

    const defaultCityValue = cityList.some(c => c.id === defaultCityId) ? defaultCityId : undefined

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={typeof errors.name !== 'undefined'}>
                <FormLabel fontWeight="bold" htmlFor="name">
                    Model name
                </FormLabel>
                <Input
                    bgColor="white"
                    color="black.900"
                    id="name"
                    placeholder="Simple RNN"
                    {...register('name', {
                        required: 'Name is required',
                    })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={typeof errors.epochs !== 'undefined'}>
                <FormLabel fontWeight="bold" htmlFor="epochs">
                    Initial training epochs
                </FormLabel>
                <Input
                    bgColor="white"
                    color="black.900"
                    id="epochs"
                    placeholder="1"
                    {...register('epochs', {
                        required: 'Epoch count is required',
                        min: { value: 1, message: 'At least one epoch is required' },
                        pattern: { value: /^\d+$/, message: 'Please give a number' },
                    })}
                />
                <FormErrorMessage>{errors.epochs?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={typeof errors.hiddenLayerCount !== 'undefined'}>
                <FormLabel fontWeight="bold" htmlFor="hiddenLayerCount">
                    Number of Hidden Layers
                </FormLabel>
                <Input
                    bgColor="white"
                    color="black.900"
                    id="hiddenLayerCount"
                    placeholder="1"
                    {...register('hiddenLayerCount', {
                        required: 'Hidden Layer count is required',
                        min: { value: 1, message: 'At least one layer is required' },
                        pattern: { value: /^\d+$/, message: 'Please give a number' },
                    })}
                />
                <FormErrorMessage>{errors.hiddenLayerCount?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={typeof errors.lstm_count !== 'undefined'}>
                <FormLabel fontWeight="bold" htmlFor="lstm_count">
                    Number of LSTM units
                </FormLabel>
                <Input
                    bgColor="white"
                    color="black.900"
                    id="lstm_count"
                    placeholder="1"
                    {...register('lstm_count', {
                        required: 'LSTM Unit count is required',
                        min: { value: 1, message: 'At least one unit is required' },
                        pattern: { value: /^\d+$/, message: 'Please give a number' },
                    })}
                />
                <FormErrorMessage>{errors.lstm_count?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={typeof errors.city !== 'undefined'}>
                <FormLabel fontWeight="bold" htmlFor="city">
                    City
                </FormLabel>
                <Select
                    icon={<FaMapMarkerAlt />}
                    bgColor="white"
                    placeholder="Select a city"
                    defaultValue={defaultCityValue}
                    {...register('city', {
                        required: 'City is required',
                    })}
                >
                    {cityList.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="primary" isLoading={isSubmitting} type="submit">
                Submit
            </Button>
        </form>
    )
}
