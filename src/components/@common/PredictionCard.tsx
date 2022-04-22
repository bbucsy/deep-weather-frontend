import { CheckIcon, MinusIcon } from '@chakra-ui/icons'
import {
    Box,
    Center,
    Divider,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from '@chakra-ui/react'
import { PredictionListDto, PredictionService } from '../../service'
import { weatherCodeToLablel } from '../../utils/WeatherLabel'

export interface PredictionCardProps {
    prediction: PredictionListDto
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }: PredictionCardProps) => {
    const wEnd = new Date(prediction.predictionTime)
    const wStart = new Date(prediction.predictionTime - 60 * 60 * 1000)

    const sendResponse = (code: number) => {
        PredictionService.addResponse({
            prediction_id: prediction.id,
            response: code,
        }).then(() => {
            console.log('DONE')
        })
    }

    return (
        <Box boxShadow="lg" borderRadius="lg">
            <Box bgColor="teal" p="3" borderTopRadius="lg">
                <Center pb="5">
                    <Text fontWeight="bold" color="gray.300">
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
                    <Box p="4">
                        <IconButton
                            aria-label="Right"
                            icon={<CheckIcon />}
                            bgColor="green"
                            color="white"
                            onClick={() => {
                                sendResponse(prediction.predictedLabel)
                            }}
                            margin="3"
                        ></IconButton>
                        <Menu>
                            <MenuButton as={IconButton} color="white" bgColor="red">
                                <MinusIcon />
                            </MenuButton>
                            <MenuList>
                                {[0, 1, 2, 3, 4, 5, 6]
                                    .filter(c => c !== prediction.predictedLabel)
                                    .map(c => (
                                        <MenuItem
                                            key={c}
                                            onClick={() => {
                                                sendResponse(c)
                                            }}
                                        >
                                            {weatherCodeToLablel(c)}
                                        </MenuItem>
                                    ))}
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}
