import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CityService, CreateCityDto } from '../../service/service'
import { Page } from '../@layout/Page'

export const CityNew: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCityDto>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<CreateCityDto> = data => {
        CityService.create({ body: data }).then(() => {
            navigate('/city')
        })
    }
    return (
        <Page>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={typeof errors.name !== 'undefined'}>
                    <FormLabel htmlFor="name">City name</FormLabel>
                    <Input
                        id="name"
                        placeholder="Budapest"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={typeof errors.lat !== 'undefined'}>
                    <FormLabel htmlFor="lat">Latitude</FormLabel>
                    <Input
                        id="lat"
                        placeholder="47.4979"
                        {...register('lat', {
                            required: 'Latitude is required',
                            min: { value: -90, message: 'Latitude must be between -90 and 90 degrees' },
                            max: { value: 90, message: 'Latitude must be between -90 and 90 degrees' },
                            pattern: {
                                value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                                message: 'Please provide with a valid number',
                            },
                        })}
                    />
                    <FormErrorMessage>{errors.lat?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={typeof errors.lon !== 'undefined'}>
                    <FormLabel htmlFor="lon">Longitude</FormLabel>
                    <Input
                        id="lon"
                        placeholder="19.0402"
                        {...register('lon', {
                            required: 'Longitude is required',
                            min: { value: -180, message: 'Longitude must be between -180 and 180 degrees' },
                            max: { value: 180, message: 'Longitude must be between -180 and 180 degrees' },
                            pattern: {
                                value: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                                message: 'Please provide with a valid number',
                            },
                        })}
                    />
                    <FormErrorMessage>{errors.lon?.message}</FormErrorMessage>
                </FormControl>

                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Page>
    )
}
