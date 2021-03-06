import { Tabs, TabList, Tab, TabPanels, TabPanel, Alert, AlertIcon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PredictionListDto, PredictionService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { PredictionCard } from './PredictionCard'

export interface PredictionsTabProps {
    cityId?: number
}

export const PredictionsTab: React.FC<PredictionsTabProps> = ({ cityId }: PredictionsTabProps) => {
    const [predictions, setPredcitions] = useState<PredictionListDto[]>([])

    const { setLoading, throwError } = useAppStateContext()

    useEffect(() => {
        setLoading(true)
        setPredcitions([])
        if (typeof cityId !== 'undefined')
            PredictionService.currentPredictionsOfCity(cityId)
                .then(result => {
                    setPredcitions(result.data)
                })
                .catch(err => {
                    throwError('Could not fetch predictions')
                })
                .finally(() => {
                    setLoading(false)
                })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityId])

    if (typeof cityId === 'undefined' || !predictions || predictions.length === 0)
        return (
            <Alert status="warning">
                <AlertIcon />
                There are no predictions for the next hour. Try an other city!
            </Alert>
        )

    return (
        <Tabs colorScheme={'primary'}>
            <TabList>
                {predictions.map(p => (
                    <Tab key={p.id}>{p.model.name}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {predictions.map(p => (
                    <TabPanel key={p.id}>
                        <PredictionCard prediction={p}></PredictionCard>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}
