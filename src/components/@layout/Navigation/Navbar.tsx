import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Link } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { NavItem, NavItems } from '../../../utils/NavItem'
import { Logo } from './Logo'
import { UserButton } from '../../@common/UserButton'
import { useAuthContext } from '../../../utils/useAuthContext'
import { ProfileDto, Role } from '../../../utils/AuthContext'

interface NavLinkProps {
    navitem: NavItem
    isLoggedIn: boolean
    profile?: ProfileDto
}
const NavLink: React.FC<NavLinkProps> = ({ navitem, isLoggedIn, profile }) => {
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

export const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoggedIn, profile } = useAuthContext()

    return (
        <>
            <Box bgColor="gray.50" px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Logo />
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {NavItems.map(link => (
                                <NavLink key={link.text} navitem={link} isLoggedIn={isLoggedIn} profile={profile} />
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <UserButton />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {NavItems.map(link => (
                                <NavLink key={link.text} navitem={link} isLoggedIn={isLoggedIn} profile={profile} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}
