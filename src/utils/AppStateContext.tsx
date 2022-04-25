import { useToast } from '@chakra-ui/react'
import React, { createContext, useContext, useState } from 'react'
import { Loading } from '../components/@common/Loader'

export interface AppStateContextType {
    isLoading: boolean
    setLoading: (isLoading: boolean) => void
    throwError: (message: string, title?: string) => void
    throwSuccess: (message: string, title?: string) => void
}

export const AppStateContext = createContext<AppStateContextType>({
    isLoading: false,
    setLoading: () => {},
    throwError: () => {},
    throwSuccess: () => {},
})

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const toast = useToast()

    const throwError = (message: string, title?: string) => {
        toast({
            title: title ?? 'An unexpected error occured',
            description: message,
            status: 'error',
            duration: 3500,
            isClosable: true,
        })
    }
    const throwSuccess = (message: string, title?: string) => {
        toast({
            title: title ?? 'Action successful',
            description: message,
            status: 'success',
            duration: 3500,
            isClosable: true,
        })
    }

    return (
        <AppStateContext.Provider value={{ isLoading, setLoading, throwError, throwSuccess }}>
            {isLoading ? <Loading timeout={0.5} /> : <></>}
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppStateContext = () => {
    return useContext<AppStateContextType>(AppStateContext)
}
