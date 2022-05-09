import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PredictionService, ResponseListDto } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { weatherCodeToLablel } from '../../utils/WeatherLabel'
import { Card } from '../@layout/Card'
import { Page } from '../@layout/Page'

interface StatState {
    count: number
    good: number
    bad: number
}

export const ResponseList: React.FC = () => {
    const [responses, setResponses] = useState<ResponseListDto[]>([])
    const [stat, setStat] = useState<StatState>({
        bad: 0,
        count: 0,
        good: 0,
    })
    const { setLoading, throwError } = useAppStateContext()

    const getData = async () => {
        const data = await Promise.all([PredictionService.responses(), PredictionService.getResponseStatistics()])
        setResponses(data[0].data)
        const stats = data[1].data
        setStat({
            count: stats.numResponses,
            good: stats.numGood,
            bad: stats.numResponses - stats.numGood,
        })
    }

    useEffect(() => {
        setLoading(true)
        getData()
            .catch(err => {
                console.log(err)
                throwError('Could not load responses')
            })
            .finally(() => {
                setLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Page adminRequired>
            {responses && responses.length > 0 && (
                <Card>
                    <h2>Response statistics:</h2>
                    <Stack spacing={10}>
                        <StatGroup borderRadius="lg" p={'5'}>
                            <Stat>
                                <StatLabel>All response sent</StatLabel>
                                <StatNumber>{stat.count}</StatNumber>
                            </Stat>

                            <Stat>
                                <StatLabel>Model validations</StatLabel>
                                <StatNumber>{stat.good}</StatNumber>
                                <StatHelpText>{((stat.good / stat.count) * 100).toFixed(2)}%</StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Model invalidations</StatLabel>
                                <StatNumber>{stat.bad}</StatNumber>
                                <StatHelpText>{((stat.bad / stat.count) * 100).toFixed(2)}%</StatHelpText>
                            </Stat>
                        </StatGroup>

                        <TableContainer>
                            <Table variant="simple">
                                <TableCaption placement="top">The last 100 user responses</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Response time</Th>
                                        <Th>Model name</Th>
                                        <Th>Prediction</Th>
                                        <Th>User response</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {responses.map(r => (
                                        <Tr key={r.id}>
                                            <Td>{r.created_at}</Td>
                                            <Td>{r.model.name}</Td>
                                            <Td>{weatherCodeToLablel(r.prediction)}</Td>
                                            <Td>{weatherCodeToLablel(r.userResponse)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Card>
            )}
        </Page>
    )
}
