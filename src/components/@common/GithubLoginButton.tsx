import { Button, Center, Text } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

export const GithubLoginButton: React.FC = () => {
    const clickHandler = () => {
        const client_id = process.env.REACT_APP_GITHUB_CLIENT
        const scope = 'read:user,user:email'
        const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`
        window.location.href = url
    }
    return (
        <Center p={8}>
            <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FaGithub />} onClick={clickHandler}>
                <Center>
                    <Text>Continue with Github</Text>
                </Center>
            </Button>
        </Center>
    )
}
