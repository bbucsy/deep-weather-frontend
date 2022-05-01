import { Stack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginDto } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { useAuthContext } from '../../utils/useAuthContext'

export const LoginForm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { Login } = useAuthContext()
    const { register, handleSubmit } = useForm<LoginDto>()
    const { throwError, throwSuccess, setLoading } = useAppStateContext()

    const onSubmit: SubmitHandler<LoginDto> = data => {
        setLoading(true)
        Login(data)
            .then(() => {
                throwSuccess('', 'Login successful')
            })
            .catch(err => {
                console.log(err)
                throwError('Login failed')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} type="email" />
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input {...register('password')} type="password" />
            </FormControl>
            <Stack spacing={10} mt="5">
                <Text>{children}</Text>
                <Button
                    colorScheme={'primary'}
                    type="submit"
                    _hover={{
                        bg: 'primary.300',
                    }}
                >
                    Sign In
                </Button>
            </Stack>
        </form>
    )
}
