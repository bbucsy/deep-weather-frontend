import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { NeuralModelService } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { Role } from '../../utils/AuthContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { NavLink } from '../@layout/Navigation/NavLink'

export const UserButton: React.FC<{ isNavlink?: boolean }> = ({ isNavlink }) => {
    const { isLoggedIn, profile, Logout } = useAuthContext()
    const navigate = useNavigate()

    const { setLoading, throwError, throwSuccess } = useAppStateContext()

    const wrapPromise = async <T,>(
        promise: Promise<T>,
        erroMessage?: string,
        successMessage?: string
    ): Promise<T | void> => {
        setLoading(true)
        try {
            const result = await promise
            setLoading(false)
            if (successMessage) throwSuccess(successMessage)
            return result
        } catch (error) {
            if (erroMessage) throwError(erroMessage)
            setLoading(false)
            return
        }
    }

    if (isNavlink && !isLoggedIn) {
        return <NavLink navitem={{ link: '/auth', text: 'Sign In' }} isLoggedIn={false}></NavLink>
    }

    if (!isNavlink && !isLoggedIn)
        return (
            <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme={'primary'}
                onClick={() => navigate('/auth')}
                _hover={{
                    bg: 'primary.300',
                }}
            >
                Sign in
            </Button>
        )

    if (isNavlink && isLoggedIn) return <></>

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
                        <MenuDivider />
                        <MenuItem
                            onClick={() =>
                                wrapPromise(
                                    NeuralModelService.predict(),
                                    'Could not make predictions',
                                    'Forced prediction creation'
                                )
                            }
                        >
                            Force Predictions
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                wrapPromise(
                                    NeuralModelService.retrain(),
                                    'Could not retrain models',
                                    'Started retraining'
                                )
                            }
                        >
                            Force Retrain
                        </MenuItem>
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
