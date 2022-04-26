import { CheckIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, IconButton, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import { PredictionListDto } from '../../service'
import { useAuthContext } from '../../utils/useAuthContext'
import { weatherCodeToLablel } from '../../utils/WeatherLabel'

export interface UserResponseButtonsProp {
    sendResponse: (code: number) => void
    prediction: PredictionListDto
}

export const UserResponseButtons: React.FC<UserResponseButtonsProp> = ({ sendResponse, prediction }) => {
    const { isLoggedIn } = useAuthContext()

    if (!isLoggedIn)
        return (
            <Box p="4">
                <Text>Log in to send response</Text>
            </Box>
        )

    return (
        <Box p="4">
            <IconButton
                aria-label="Right"
                icon={<CheckIcon />}
                bgColor="green.400"
                color="white"
                onClick={() => {
                    sendResponse(prediction.predictedLabel)
                }}
                margin="3"
            ></IconButton>
            <Menu>
                <MenuButton as={IconButton} color="white" bgColor="red.400">
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
    )
}
