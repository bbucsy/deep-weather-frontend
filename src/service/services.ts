import { AuthApi, CityApi, NeuralModelApi, PredictionsApi } from './api'
import axios from 'axios'
import { Configuration } from './configuration'
import { JWT_TOKEN_COOKIE_KEY } from '../utils/constants'
import Cookies from 'js-cookie'

const baseUrl = process.env.REACT_APP_API_URL

const configuration = new Configuration({
    basePath: baseUrl,
})

export const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(config => {
    const token = Cookies.get(JWT_TOKEN_COOKIE_KEY)
    if (process.env.REACT_APP_API_KEY && config.headers) {
        config.headers['x-api-key'] = process.env.REACT_APP_API_KEY
    }
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export const CityService = new CityApi(configuration, baseUrl, axiosInstance)
export const NeuralModelService = new NeuralModelApi(configuration, baseUrl, axiosInstance)
export const PredictionService = new PredictionsApi(configuration, baseUrl, axiosInstance)
export const AuthService = new AuthApi(configuration, baseUrl, axiosInstance)

export const lagger = async <T>(todo: Promise<T>): Promise<T> => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve()
        }, 2000)
    }).then(() => {
        return todo
    })
}
