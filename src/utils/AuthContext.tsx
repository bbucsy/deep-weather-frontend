import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService, LoginDto, RegisterDto } from '../service'
import { JWT_TOKEN_COOKIE_KEY } from './constants'

export enum Role {
    Guest = 'guest',
    User = 'user',
    Admin = 'admin',
}

export interface ProfileDto {
    username: string
    role: Role
}

export interface AuthContextType {
    isLoggedIn: boolean
    profile?: ProfileDto
    Login: (dto: LoginDto) => Promise<void>
    LoginGH: (token: string) => Promise<void>
    Register: (dto: RegisterDto) => Promise<void>
    Logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    Login: () => Promise.resolve(),
    Register: () => Promise.resolve(),
    Logout: () => {},
    LoginGH: () => Promise.resolve(),
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(JWT_TOKEN_COOKIE_KEY) !== 'undefined')
    const [profile, setProfile] = useState<ProfileDto>()
    const navigate = useNavigate()

    const Login = async (dto: LoginDto) => {
        return AuthService.login(dto).then(res => {
            Cookies.set(JWT_TOKEN_COOKIE_KEY, res.data.access_token)
            setIsLoggedIn(true)
            navigate('/')
        })
    }

    const LoginGH = async (token: string) => {
        return AuthService.oauthTokenExchange({ token: token }).then(res => {
            Cookies.set(JWT_TOKEN_COOKIE_KEY, res.data.access_token)
            setIsLoggedIn(true)
            navigate('/')
        })
    }

    const Register = async (dto: RegisterDto) => {
        return AuthService.register(dto).then(res => {
            Cookies.set(JWT_TOKEN_COOKIE_KEY, res.data.access_token)
            setIsLoggedIn(true)
            navigate('/')
        })
    }
    const Logout = () => {
        Cookies.remove(JWT_TOKEN_COOKIE_KEY)
        setIsLoggedIn(false)
        setProfile(undefined)
        navigate('/auth')
    }

    useEffect(() => {
        if (isLoggedIn) {
            const token = Cookies.get(JWT_TOKEN_COOKIE_KEY)
            if (typeof token === 'undefined') return
            setProfile(jwtDecode<ProfileDto>(token))
        }
    }, [isLoggedIn])

    return (
        <AuthContext.Provider value={{ isLoggedIn, profile, Login, Register, Logout, LoginGH }}>
            {children}
        </AuthContext.Provider>
    )
}
