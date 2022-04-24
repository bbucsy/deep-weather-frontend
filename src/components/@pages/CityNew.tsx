import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Flex, Spacer } from '@chakra-ui/react'
import { Marker, Map } from 'pigeon-maps'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CityService, CreateCityDto } from '../../service'

import { Page } from '../@layout/Page'

interface coords {
    lat: number
    lon: number
}

export const CityNew: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm<CreateCityDto>()

    const [mapCoords, setMapCoords] = useState<coords>({ lat: 47.4979, lon: 19.0402 })

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<CreateCityDto> = data => {
        CityService.create(data).then(() => {
            navigate('/city')
        })
    }

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (
                (name === 'lat' || name === 'lon') &&
                typeof value.lat !== 'undefined' &&
                typeof value.lon !== 'undefined'
            ) {
                setMapCoords({
                    lat: value.lat,
                    lon: value.lon,
                })
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    return (
        <Page>
            <Flex>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={typeof errors.name !== 'undefined'}>
                            <FormLabel htmlFor="name">City name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Budapest"
                                {...register('name', {
                                    required: 'Name is required',
                                    value: 'Budapest',
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
                                    value: 47.4979,
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
                                    value: 19.0402,
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
                </Box>
                <Spacer />
                <Box w="100%" margin="5">
                    <Map
                        height={300}
                        defaultCenter={[mapCoords.lat, mapCoords.lon]}
                        defaultZoom={11}
                        center={[mapCoords.lat, mapCoords.lon]}
                        onClick={({ latLng }) => {
                            setValue('lat', latLng[0])
                            setValue('lon', latLng[1])
                        }}
                    >
                        <Marker width={50} anchor={[mapCoords.lat, mapCoords.lon]} />
                    </Map>
                </Box>
            </Flex>
        </Page>
    )
}
