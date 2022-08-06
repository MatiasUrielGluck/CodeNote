const folderDao = require('./dao')

module.exports = {
    async getFolders(req, res) {
        const folders = await folderDao.getFolders()
        res.send(JSON.stringify(folders))
    },

    async getFolder(req, res) {
        const { folderId } = req.params
        const folder = await folderDao.getFolder(folderId)
        res.send(JSON.stringify(folder))
    },
    
    async createFolder(req, res) {
        const { name } = req.body
        const folder = await folderDao.createFolder(name)
        res.send(JSON.stringify(folder))
    },
    
    async updateFolder(req, res) {
        const { folderId } = req.params
        const { name } = req.body
        const folder = await folderDao.updateFolder(folderId, name)
        res.send(JSON.stringify(folder))
    },

    async deleteFolder(req, res) {
        const { folderId } = req.params
        const folder = await folderDao.deleteFolder(folderId)
        res.send(JSON.stringify(folder))
    }
}