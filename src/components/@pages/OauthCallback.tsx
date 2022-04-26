import { Center, CircularProgress, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppStateContext } from '../../utils/AppStateContext'
import { useAuthContext } from '../../utils/useAuthContext'
import { Page } from '../@layout/Page'

export const OauthCallback: React.FC = () => {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const { LoginGH } = useAuthContext()
    const { throwError } = useAppStateContext()

    useEffect(() => {
        if (typeof code !== 'undefined' && code != null) {
            LoginGH(code).catch(err => {
                console.log(err)
                throwError('Could not login via Github. See console for more info!')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    return (
        <Page>
            <Center>
                <Text>Please wait while we verify your login!</Text>
            </Center>
            <Center>
                <CircularProgress isIndeterminate color="primary.300" />
            </Center>
        </Page>
    )
}
