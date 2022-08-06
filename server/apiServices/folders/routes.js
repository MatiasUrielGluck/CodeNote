const express = require('express')
const controller = require('./controller')
const router = express.Router()
const notesRoutes = require('../notes/routes')

router.use('/:folderId/notes', notesRoutes)

router.get('/', controller.getFolders)
router.post('/', controller.createFolder)
router.get('/:folderId', controller.getFolder)
router.patch('/:folderId', controller.updateFolder)
router.delete('/:folderId', controller.deleteFolder)

module.exports = router