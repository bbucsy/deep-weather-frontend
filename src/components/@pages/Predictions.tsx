import { Box, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { CityDto, CityService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { PredictionsTab } from '../@common/PredictionsTab'
import { Page } from '../@layout/Page'

export const Predictions: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const [selectedCityId, setSelectedCityId] = useState<number>()
    const { setLoading, throwError } = useAppStateContext()

    const selectionChanged = (e: any) => {
        setSelectedCityId(e.target.value)
    }

    useEffect(() => {
        setLoading(true)
        CityService.findAll()
            .then(res => {
                setCityList(res.data)
                setSelectedCityId(res.data[0]?.id)
            })
            .catch(err => {
                throwError('Could not fetch city list')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCityList, setSelectedCityId])

    return (
        <Page>
            {cityList && cityList.length > 0 && (
                <Select
                    icon={<FaMapMarkerAlt />}
                    onChange={selectionChanged}
                    value={selectedCityId}
                    bgColor="white"
                    mb="8"
                >
                    {cityList.map(city => (
                        <option value={city.id} key={city.id}>
                            {city.name}
                        </option>
                    ))}{' '}
                </Select>
            )}

            <Box>
                <PredictionsTab cityId={selectedCityId} />
            </Box>
        </Page>
    )
}
