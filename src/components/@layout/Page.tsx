import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const Page: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => (
    <>
        <Flex flexDirection="column" px="4" mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
            <Outlet />
            {children}
        </Flex>
    </>
)
