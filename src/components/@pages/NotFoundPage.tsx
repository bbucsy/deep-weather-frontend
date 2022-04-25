import { Box, Heading, Text } from '@chakra-ui/react'
import { LinkButton } from '../@common/LinkButton'

export const NotFoundPage: React.FC = () => {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, teal.400, teal.600)"
                backgroundClip="text"
            >
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you're looking for does not seem to exist
            </Text>

            <LinkButton
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                href="/"
                variant="solid"
            >
                Go to Home
            </LinkButton>
        </Box>
    )
}
