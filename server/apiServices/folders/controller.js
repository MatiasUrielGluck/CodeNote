const folderDao = require('./dao')

module.exports = {
    async getFolders(req, res) {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const userId = req.user._id
        if (!userId) { res.sendStatus(401) }
        const folders = await folderDao.getFolders(userId)
        res.send(JSON.stringify(folders))
    },

    async getFolder(req, res) {
        const { folderId } = req.params
        const folder = await folderDao.getFolder(folderId)
        res.send(JSON.stringify(folder))
    },
    
    async createFolder(req, res) {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const { name } = req.body
        const userId = req.user._id
        if (!userId) { res.sendStatus(401) }
        const folder = await folderDao.createFolder(userId, name)
        res.send(JSON.stringify(folder))
    },
    
    async updateFolder(req, res) {
        const { folderId } = req.params
        const { name } = req.body
        const folder = await folderDao.updateFolder(folderId, name)
        res.send(JSON.stringify(folder))
    },

    async deleteFolder(req, res) {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const { folderId } = req.params
        const userId = req.user._id
        if (!userId) { res.sendStatus(401) }
        const folder = await folderDao.deleteFolder(userId, folderId)
        res.send(JSON.stringify(folder))
    }
}