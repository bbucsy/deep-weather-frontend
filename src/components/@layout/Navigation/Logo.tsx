import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export const Logo: React.FC = props => (
    <Box {...props}>
        <Text fontSize="lg" fontWeight="bold">
            Deep Weather
        </Text>
    </Box>
)
