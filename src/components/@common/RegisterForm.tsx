import { Stack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RegisterDto } from '../../service'
import { useAppStateContext } from '../../utils/AppStateContext'
import { useAuthContext } from '../../utils/useAuthContext'

export const RegisterForm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { Register } = useAuthContext()
    const { register, handleSubmit } = useForm<RegisterDto>()
    const { throwError, throwSuccess, setLoading } = useAppStateContext()

    const onSubmit: SubmitHandler<RegisterDto> = data => {
        setLoading(true)
        Register(data)
            .then(() => {
                throwSuccess('', 'Registration successful')
            })
            .catch(err => {
                console.log(err)
                throwError('There is already a user with this email')
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
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input {...register('username')} type="text" />
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
                    Register
                </Button>
            </Stack>
        </form>
    )
}
