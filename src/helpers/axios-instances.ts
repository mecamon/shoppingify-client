import axios, {AxiosError} from 'axios'
// @ts-ignore
const baseURL = !import.meta.env.PROD ? 'http://localhost:3004' : 'http://localhost:3004'

const axiosJsonIns = axios.create({
    baseURL,
    timeout: 8000,
    headers: {'Content-Type': 'application/json'}
})
axiosJsonIns.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    let lang = localStorage.getItem('lang')
    config.headers = {
        'Authorization': token ?? '',
        'Accept-Language': lang ?? ''
    }
    return config
}, function (config) {
    return config
})
axiosJsonIns.interceptors.response.use(function (response) {
    return response
}, function (error: AxiosError) {
    if (error.response?.status === 401) {
        localStorage.removeItem('token')
    }
    return Promise.reject(error)
})

//FOR MULTIPART FD
const axiosMultiPartIns = axios.create({
    baseURL,
    timeout: 8000,
    headers: {'Content-Type': 'multipart/form-data'}
})
axiosMultiPartIns.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token')
    let lang = localStorage.getItem('lang')
    config.headers = {
        'Authorization': token ?? '',
        'Accept-Language': lang ?? ''
    }
    return config
}, function (config) {
    return config
})
axiosMultiPartIns.interceptors.response.use(function(response) {
    return response
}, function(error: AxiosError) {
    if (error.response?.status === 401) {
        localStorage.removeItem('token')
    }
    return Promise.reject(error)
})

export { axiosJsonIns, axiosMultiPartIns }
