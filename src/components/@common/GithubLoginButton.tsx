import { Button, Center } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

export const GithubLoginButton: React.FC = () => {
    const clickHandler = () => {
        const client_id = process.env.REACT_APP_GITHUB_CLIENT
        const scope = 'read:user,user:email'
        const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`
        window.location.href = url
    }
    return (
        <Center mt={'5'}>
            <Button
                w={'full'}
                maxW={'md'}
                bgColor={'black.800'}
                color={'white'}
                leftIcon={<FaGithub />}
                onClick={clickHandler}
            >
                Sign in with Github
            </Button>
        </Center>
    )
}
