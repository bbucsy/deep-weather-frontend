import { Center, Heading, Image, Text } from '@chakra-ui/react'
import { Page } from '../@layout/Page'

export enum ErrorType {
    loginRequired,
    adminRequired,
}

export const UnauthorizedPage: React.FC<{ errorType: ErrorType }> = ({ errorType }) => {
    const errorCode = errorType === ErrorType.loginRequired ? 401 : 403
    return (
        <Page>
            <Heading textAlign="center" color={'primary.500'}>
                Unauthorized
            </Heading>
            <Text textAlign="center" fontWeight="bold">
                You need {errorType === ErrorType.loginRequired ? 'to log in' : 'admin priviliges'} to access this page.
            </Text>
            <Center minH={'80vh'}>
                <Image pt="5" src={`/${errorCode}.jpeg`} alt={`Error code ${errorCode}`} />
            </Center>
        </Page>
    )
}
