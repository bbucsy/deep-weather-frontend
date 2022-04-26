import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => (
    <Box>
        <Link to="/">
            <Text fontSize="xl" fontWeight="bold" color="primary.4+00">
                Deep Weather
            </Text>
        </Link>
    </Box>
)
