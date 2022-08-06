const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Folder'
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note