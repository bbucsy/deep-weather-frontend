import { Flex } from '@chakra-ui/react'
import { FC, ReactChild } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navigation/Navbar'

export const Page: FC<{ children?: ReactChild | ReactChild[] }> = ({
    children,
    ...props
}) => (
    <>
        <Navbar />
        <Flex
            flexDirection="column"
            px="4"
            mx="auto"
            maxWidth={['100%', '48rem', '48rem', '64rem']}
        >
            <Outlet />
            {children}
        </Flex>
    </>
)
