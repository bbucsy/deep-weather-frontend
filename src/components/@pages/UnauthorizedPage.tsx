import { Heading, Image, Text } from '@chakra-ui/react'
import { Page } from '../@layout/Page'

export enum ErrorType {
    loginRequired,
    adminRequired,
}

export const UnauthorizedPage: React.FC<{ errorType: ErrorType }> = ({ errorType }) => {
    const errorCode = errorType === ErrorType.loginRequired ? 401 : 403
    return (
        <Page>
            <Heading textAlign="center">Unauthorized</Heading>
            <Text textAlign="center">
                You need {errorType === ErrorType.loginRequired ? 'to log in' : 'admin priviliges'} to access this page.
            </Text>
            <Image src={`/${errorCode}.jpeg`} alt={`Error code ${errorCode}`} />
        </Page>
    )
}
