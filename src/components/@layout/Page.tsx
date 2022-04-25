import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Role } from '../../utils/AuthContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { ErrorType, UnauthorizedPage } from '../@pages/UnauthorizedPage'

interface PageProps {
    children?: React.ReactNode
    loginRequired?: boolean
    adminRequired?: boolean
}

export const Page: React.FC<PageProps> = ({ children, loginRequired, adminRequired }) => {
    const { isLoggedIn, profile } = useAuthContext()

    if (loginRequired && !isLoggedIn) return <UnauthorizedPage errorType={ErrorType.loginRequired} />
    if (adminRequired && profile?.role !== Role.Admin) return <UnauthorizedPage errorType={ErrorType.adminRequired} />
    return (
        <Flex flexDirection="column" px="4" mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']} mt="5">
            <Outlet />
            {children}
        </Flex>
    )
}
