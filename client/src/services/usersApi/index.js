import Api from './Api'

export default {
    createUser: async function(body) {
        return await Api().post('/', body)
        .then(() => {
            return 'Successfully registered'
        })
        .catch(err => {
            if (err.response.status === 401) {
                return 'User already exists'
            }
        })
    },

    login: async function(body) {
        return await Api().post('/login', body)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
}