import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Divider, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CityDto, CityService, PredictionListDto, PredictionService } from '../../service'
import { Page } from '../@layout/Page'

export const Predictions: React.FC = () => {
    const [cityList, setCityList] = useState<CityDto[]>([])

    const [selectedCityId, setSelectedCityId] = useState<number>()

    const [predictions, setPredictions] = useState<PredictionListDto[]>([])

    const selectionChanged = (e: any) => {
        console.log(e.target.value)
        setSelectedCityId(e.target.value)
        reloadPredictions(e.target.value)
    }

    useEffect(() => {
        console.log('Effect used')
        CityService.findAll().then(res => {
            setCityList(res.data)
            setSelectedCityId(res.data[0]?.id)
            reloadPredictions(selectedCityId)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCityList, setSelectedCityId, setPredictions])

    const reloadPredictions = (cityId?: number) => {
        if (typeof cityId === 'undefined') return
        PredictionService.currentPredictionsOfCity(cityId).then(result => {
            setPredictions(result.data)
        })
    }

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

            <Tabs>
                <TabList>
                    {predictions.map(p => (
                        <Tab key={p.id}>{p.model.name}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {predictions.map(p => (
                        <TabPanel key={p.id}>
                            <p>
                                {p.predictedLabel}, {p.userResponseLabel}
                            </p>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Page>
    )
}
