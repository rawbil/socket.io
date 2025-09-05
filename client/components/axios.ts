import axios from 'axios'

const NEXT_PUBLIC_API_URL  = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
export const axiosApi = axios.create({
    url: NEXT_PUBLIC_API_URL
})