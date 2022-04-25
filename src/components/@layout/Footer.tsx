import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { SocialButton } from '../@common/SocialButton'

export const Footer: React.FC = () => {
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>© {new Date().getFullYear()} Bucsy Benjámin</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Frontend'} href={'https://github.com/poiuztrewq1/'}>
                        <FaGithub />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    )
}
