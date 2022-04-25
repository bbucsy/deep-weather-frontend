import { Center, CircularProgress, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStateContext } from '../../utils/AppStateContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { Page } from '../@layout/Page'

export const OauthCallback: React.FC = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const { Login, Register } = useAuthContext()
    const { throwError, throwSuccess } = useAppStateContext()

    useEffect(() => {
        if (typeof code !== 'undefined') {
        }
    }, [code])

    return (
        <Page>
            <Center>
                <Text>Your token is {code}</Text>
                <CircularProgress isIndeterminate color="green.300" />
            </Center>
        </Page>
    )
}
