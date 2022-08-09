import axios from 'axios'

export default () => {
    return axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3000/folders'
    })
}