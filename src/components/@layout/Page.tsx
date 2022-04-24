import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navigation/Navbar'

export const Page: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => (
    <>
        <Navbar />
        <Flex flexDirection="column" px="4" mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
            <Outlet />
            {children}
        </Flex>
    </>
)
