import Api from './Api'

export default {
    getNotes: async function(folderId) {
        return await Api().get('/' + folderId + '/notes')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    createNote: async function(folderId, body) {
        return await Api().post('/' + folderId + '/notes', body)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    deleteNote: async function(folderId, id) {
        return await Api().delete('/' + folderId + '/notes/' + id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}