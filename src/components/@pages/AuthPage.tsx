import { Flex, Stack, Heading, Box, Link, Divider } from '@chakra-ui/react'
import { useState } from 'react'

import { GithubLoginButton } from '../@common/GithubLoginButton'
import { LoginForm } from '../@common/LoginForm'
import { RegisterForm } from '../@common/RegisterForm'
import { Page } from '../@layout/Page'

export const AuthPage: React.FC = () => {
    const [signup, setSignup] = useState<boolean>(false)

    const changeForm = () => {
        setSignup(!signup)
    }

    const header = signup ? 'Sign up for more features' : 'Sign in to your account'
    const actionText = signup ? 'Sign in' : 'Sign Up'
    const explainText = signup ? 'If you already have an account' : "If you don't have an account"

    const middleText = () => (
        <>
            {'Or '}
            <Link as="span" color="primary.600" onClick={changeForm}>
                {actionText}
            </Link>{' '}
            {explainText}
        </>
    )

    return (
        <Page>
            <Flex>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>{header}</Heading>
                    </Stack>
                    <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            {signup ? (
                                <RegisterForm>{middleText()}</RegisterForm>
                            ) : (
                                <LoginForm>{middleText()}</LoginForm>
                            )}
                        </Stack>
                    </Box>
                    <Divider />
                    <GithubLoginButton />
                </Stack>
            </Flex>
        </Page>
    )
}
