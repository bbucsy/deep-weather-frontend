import { Box, Center, Divider, Flex, Spacer, Text } from '@chakra-ui/react'
import { PredictionListDto, PredictionService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { weatherCodeToLablel } from '../../utils/WeatherLabel'
import { UserResponseButtons } from './UserResponseButtons'

export interface PredictionCardProps {
    prediction: PredictionListDto
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }: PredictionCardProps) => {
    const wEnd = new Date(prediction.predictionTime)
    const wStart = new Date(prediction.predictionTime - 60 * 60 * 1000)

    const { setLoading, throwSuccess, throwError } = useAppStateContext()

    const sendResponse = (code: number) => {
        setLoading(true)
        PredictionService.addResponse({
            prediction_id: prediction.id,
            response: code,
        })
            .then(() => {
                throwSuccess('Response sent!')
            })
            .catch(err => {
                throwError('Could no send response')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Box boxShadow="lg" borderRadius="lg">
            <Box bgColor="secondary.300" p="3" borderTopRadius="lg">
                <Center pb="5">
                    <Text fontWeight="bold" color="black.800">
                        {wStart.toLocaleTimeString()} - {wEnd.toLocaleTimeString()}
                    </Text>
                </Center>
                <Center pt="10">
                    <Text fontWeight="bold" fontSize="4xl" color="white">
                        {weatherCodeToLablel(prediction.predictedLabel)}
                    </Text>
                </Center>
            </Box>
            <Divider />
            <Box mx="2" mt="3">
                <Flex>
                    <Box p="4">
                        Users responded with:{' '}
                        <Text fontWeight="bold">{weatherCodeToLablel(prediction.userResponseLabel)}</Text>
                    </Box>
                    <Spacer />
                    <UserResponseButtons prediction={prediction} sendResponse={sendResponse} />
                </Flex>
            </Box>
        </Box>
    )
}
