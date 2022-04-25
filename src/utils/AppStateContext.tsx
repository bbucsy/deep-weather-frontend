import { Progress, useToast } from '@chakra-ui/react'
import React, { createContext, useContext, useState } from 'react'

export interface AppStateContextType {
    isLoading: boolean
    setLoading: (isLoading: boolean) => void
    throwError: (message: string) => void
    throwSuccess: (message: string) => void
}

export const AppStateContext = createContext<AppStateContextType>({
    isLoading: false,
    setLoading: () => {},
    throwError: () => {},
    throwSuccess: () => {},
})

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const toast = useToast()

    const setLoading = (value: boolean) => {
        console.log('loading')
        setIsLoading(value)
    }

    const throwError = (message: string) => {
        console.log(message)
        toast({
            title: 'An unexpected error occured',
            description: message,
            status: 'error',
            duration: 1500,
            isClosable: true,
        })
    }
    const throwSuccess = (message: string) => {
        console.log(message)
        toast({
            title: 'Action successful',
            description: message,
            status: 'success',
            duration: 1500,
            isClosable: true,
        })
    }

    return (
        <AppStateContext.Provider value={{ isLoading, setLoading, throwError, throwSuccess }}>
            {isLoading ? <Progress size="xs" isIndeterminate /> : <></>}
            {children}
        </AppStateContext.Provider>
    )
}

export const useStateContext = () => {
    return useContext<AppStateContextType>(AppStateContext)
}
