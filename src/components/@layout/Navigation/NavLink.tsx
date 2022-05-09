import { Box, Link } from '@chakra-ui/react'
import { ProfileDto, Role } from '../../../utils/AuthContext'
import { NavItem } from '../../../utils/NavItem'
import { Link as RouterLink } from 'react-router-dom'

interface NavLinkProps {
    navitem: NavItem
    isLoggedIn: boolean
    profile?: ProfileDto
}
export const NavLink: React.FC<NavLinkProps> = ({ navitem, isLoggedIn, profile }) => {
    if (navitem.loginRequired && !isLoggedIn) return null
    if (navitem.adminRequired && profile?.role !== Role.Admin) return null

    return (
        <Box px={2} py={1}>
            <Link
                as={RouterLink}
                to={navitem.link}
                fontSize="lg"
                _hover={{
                    textDecoration: 'none',
                    color: 'primary.600',
                }}
            >
                {navitem.text}
            </Link>
        </Box>
    )
}
