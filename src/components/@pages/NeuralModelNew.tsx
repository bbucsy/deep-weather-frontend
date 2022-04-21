import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CityDto, CityService } from '../../service'
import { NeuralModelForm } from '../@common/NeuralModelForm'

import { Page } from '../@layout/Page'

export const NeuralNetworkNew: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const [searchParams] = useSearchParams()
    const defaultCityID = Number.parseInt(searchParams.get('city') || '-1')

    useEffect(() => {
        CityService.findAll().then(res => {
            setCityList(res.data)
        })
    }, [setCityList])

    return (
        <Page>
            <Box>{cityList.length > 0 && <NeuralModelForm cityList={cityList} defaultCityId={defaultCityID} />}</Box>
        </Page>
    )
}
