import { Box, Heading, Text } from '@chakra-ui/react'
import { LinkButton } from '../@common/LinkButton'

export const NotFoundPage: React.FC = () => {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, primary.400, primary.600)"
                backgroundClip="text"
            >
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'black.500'} mb={6}>
                The page you're looking for does not seem to exist
            </Text>

            <LinkButton colorScheme="primary" color="white" href="/" variant="solid">
                Go to Home
            </LinkButton>
        </Box>
    )
}
