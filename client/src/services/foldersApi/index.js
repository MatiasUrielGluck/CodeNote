import Api from './Api'

export default {
    getFolders: async function() {
        return await Api().get('/')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    createFolder: async function(body) {
        return await Api().post('/', body)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    deleteFolder: async function(id) {
        return await Api().delete('/' + id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    updateFolder: async function(folderId, body) {
        return await Api().patch('/' + folderId, body)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}