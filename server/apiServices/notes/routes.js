const express = require('express')
const controller = require('./controller')
const router = express.Router({mergeParams: true})

router.get('/', controller.getNotes)
router.post('/', controller.createNote)
router.get('/:noteId', controller.getNote)
router.patch('/:noteId', controller.updateNote)
router.delete('/:noteId', controller.deleteNote)

module.exports = router