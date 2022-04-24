import { Flex, Stack, Heading, Box, FormControl, FormLabel, Input, Button, Text, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { Page } from '../@layout/Page'

export const AuthPage: React.FC = () => {
    const [signup, setSignup] = useState<boolean>(false)

    const changeForm = () => {
        setSignup(!signup)
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
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
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
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    {buttonText}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Page>
    )
}
