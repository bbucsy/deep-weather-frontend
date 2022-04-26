import { Box } from '@chakra-ui/react'

export const Card: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => (
    <Box
        px="4"
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="lg"
        paddingBottom="5"
        marginBottom="5"
        paddingTop="5"
        bgColor={'white'}
    >
        {children}
    </Box>
)
