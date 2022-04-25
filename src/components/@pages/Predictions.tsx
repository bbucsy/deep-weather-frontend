import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Divider, Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CityDto, CityService } from '../../service'
import { PredictionsTab } from '../@common/PredictionsTab'
import { Page } from '../@layout/Page'

export const Predictions: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const [selectedCityId, setSelectedCityId] = useState<number>()

    const selectionChanged = (e: any) => {
        console.log(e.target.value)
        setSelectedCityId(e.target.value)
    }

    useEffect(() => {
        CityService.findAll().then(res => {
            setCityList(res.data)
            setSelectedCityId(res.data[0]?.id)
        })
    }, [setCityList, setSelectedCityId])

    return (
        <Page>
            {cityList && (
                <Select icon={<ExternalLinkIcon />} onChange={selectionChanged} value={selectedCityId}>
                    {cityList.map(city => (
                        <option value={city.id} key={city.id}>
                            {city.name}
                        </option>
                    ))}{' '}
                </Select>
            )}

            <Divider />
            <Box mt="5">
                <PredictionsTab cityId={selectedCityId} />
            </Box>
        </Page>
    )
}
