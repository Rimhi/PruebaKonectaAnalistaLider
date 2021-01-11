import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: process.env.baseURL
})
export default clienteAxios;