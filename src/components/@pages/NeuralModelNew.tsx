import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CityDto, CityService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { NeuralModelForm } from '../@common/NeuralModelForm'

import { Page } from '../@layout/Page'

export const NeuralNetworkNew: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const [searchParams] = useSearchParams()
    const defaultCityID = Number.parseInt(searchParams.get('city') || '-1')
    const { setLoading, throwError } = useAppStateContext()

    useEffect(() => {
        setLoading(true)
        CityService.findAll()
            .then(res => {
                setCityList(res.data)
            })
            .catch(er => {
                throwError('Could not retrieve city list')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCityList])

    return (
        <Page adminRequired>
            <Box>{cityList.length > 0 && <NeuralModelForm cityList={cityList} defaultCityId={defaultCityID} />}</Box>
        </Page>
    )
}
