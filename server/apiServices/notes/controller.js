const noteDao = require('./dao')

module.exports = {
    async getNotes(req, res) {
        const { folderId } = req.params
        const notes = await noteDao.getNotes(folderId)
        res.send(JSON.stringify(notes))
    },

    async getNote(req, res) {
        const { noteId } = req.params
        const note = await noteDao.getNote(noteId)
        console.log(note)
        res.send(JSON.stringify(note))
    },
    
    async createNote(req, res) {
        const { name, content } = req.body
        const { folderId } = req.params
        const note = await noteDao.createNote(folderId, name, content)
        res.send(JSON.stringify(note))
    },
    
    async updateNote(req, res) {
        const { noteId } = req.params
        const { name, content } = req.body
        const note = await noteDao.updateNote(noteId, name, content)
        res.send(JSON.stringify(note))
    },

    async deleteNote(req, res) {
        const { noteId } = req.params
        const { folderId } = req.params
        const note = await noteDao.deleteNote(folderId, noteId)
        res.send(JSON.stringify(note))
    }
}