import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Role } from '../../utils/AuthContext'
import { useAuthContext } from '../../utils/useAuthContext'

export const UserButton: React.FC = () => {
    const { isLoggedIn, profile, Logout } = useAuthContext()
    const navigate = useNavigate()

    if (!isLoggedIn)
        return (
            <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'teal'}
                onClick={() => navigate('/auth')}
                _hover={{
                    bg: 'teal.300',
                }}
            >
                Sign in
            </Button>
        )

    return (
        <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'md'} src="/avatar-default.png" />
            </MenuButton>
            <MenuList>
                <Center>
                    <Text>
                        {profile?.username} ({profile?.role})
                    </Text>
                </Center>
                {profile?.role === Role.Admin ? (
                    <>
                        <MenuItem>Admin dashboard</MenuItem>
                        <MenuDivider />
                    </>
                ) : null}

                <MenuItem>
                    <Link onClick={Logout}>Log out</Link>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
