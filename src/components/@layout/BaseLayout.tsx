import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navigation/Navbar'

export const BaseLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Flex direction="column" minHeight="100vh">
            <Navbar />
            <Box bgColor="gray.50" flex="1" pb="20">
                {children}
            </Box>
            <Footer />
        </Flex>
    )
}
