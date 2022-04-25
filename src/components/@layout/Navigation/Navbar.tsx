import { Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { NavItem, NavItems } from '../../../utils/NavItem'
import { Logo } from './Logo'
import { UserButton } from '../../@common/UserButton'

const NavLink = ({ navitem }: { navitem: NavItem }) => (
    <Box
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
    >
        <Link to={navitem.link}>{navitem.text}</Link>
    </Box>
)

export const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
                                <NavLink key={link.text} navitem={link} />
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
                                <NavLink key={link.text} navitem={link} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}
