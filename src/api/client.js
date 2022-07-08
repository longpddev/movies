import axios from 'axios'

const baseUrl = "https://api.themoviedb.org/3"

export const client = axios.create({
    baseURL: baseUrl,
    params: {
        'api_key': process.env.REACT_APP_API_KEY
    }
})

