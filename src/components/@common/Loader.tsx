import { Progress } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

type LoadingProps = {
    timeout: number
}

export const Loading: FC<LoadingProps> = ({ timeout }) => {
    const [show, setShow] = useState<boolean>(false)
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setShow(true)
        }, timeout * 1000)

        return () => {
            clearTimeout(timeOut)
        }
    }, [timeout])
    if (!show) return null
    return <Progress size="xs" isIndeterminate />
}
