import { Flex, Stack, Heading, Box, FormControl, FormLabel, Input, Button, Text, Link, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginDto } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'

import { useAuthContext } from '../../utils/useAuthContext'
import { GithubLoginButton } from '../@common/GithubLoginButton'
import { Page } from '../@layout/Page'

export const AuthPage: React.FC = () => {
    const [signup, setSignup] = useState<boolean>(false)
    const { Login, Register } = useAuthContext()
    const { register, handleSubmit } = useForm<LoginDto>()
    const { throwError, throwSuccess, setLoading } = useAppStateContext()

    const changeForm = () => {
        setSignup(!signup)
    }

    const onSubmit: SubmitHandler<LoginDto> = data => {
        setLoading(true)
        if (!signup) {
            Login(data)
                .then(() => {
                    throwSuccess('', 'Login successful')
                })
                .catch(err => {
                    console.log(err)
                    throwError('Could not log in')
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            Register(data)
                .then(() => {
                    throwSuccess('', 'Registration successful')
                })
                .catch(err => {
                    console.log(err)
                    throwError('There is already a use with this username')
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const header = signup ? 'Sign up for more features' : 'Sign in to your account'
    const actionText = signup ? 'Sign in' : 'Sign Up'
    const explainText = signup ? 'If you already have an account' : "If you don't have an account"
    const buttonText = signup ? 'Register' : 'Sign in'
    return (
        <Page>
            <Flex>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>{header}</Heading>
                    </Stack>
                    <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl id="username">
                                    <FormLabel>Username</FormLabel>
                                    <Input {...register('username')} type="text" />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input {...register('password')} type="password" />
                                </FormControl>
                                <Stack spacing={10} mt="5">
                                    <Text>
                                        Or{' '}
                                        <Link as="span" color="blue" onClick={changeForm}>
                                            {actionText}
                                        </Link>{' '}
                                        {explainText}
                                    </Text>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        type="submit"
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                    >
                                        {buttonText}
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Divider />
                    <GithubLoginButton />
                </Stack>
            </Flex>
        </Page>
    )
}
