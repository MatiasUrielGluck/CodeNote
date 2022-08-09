import axios from 'axios'

export default () => {
    return axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:3000/folders' // In each request, append the selected folder id to the base URL
    })
}