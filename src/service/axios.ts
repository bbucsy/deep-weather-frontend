import axios from 'axios'
import { serviceOptions } from './service'
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const setupService = () => {
    serviceOptions.axios = instance
}
