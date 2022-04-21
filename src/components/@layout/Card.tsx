import { Box } from '@chakra-ui/react'
import { FC, ReactChild } from 'react'

export const Card: FC<{ children?: ReactChild | ReactChild[] }> = ({ children, ...props }) => (
    <Box px="4" borderRadius="lg" borderWidth="1px" boxShadow="lg" paddingBottom="5" marginBottom="5">
        {children}
    </Box>
)
