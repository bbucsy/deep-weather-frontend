import { Box, Flex, HStack, IconButton, useDisclosure, Stack } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { NavItems } from '../../../utils/NavItem'
import { Logo } from './Logo'
import { UserButton } from '../../@common/UserButton'
import { useAuthContext } from '../../../utils/useAuthContext'
import { NavLink } from './NavLink'

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

                            <UserButton isNavlink />
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}
