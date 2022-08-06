const mongoose = require('mongoose')
const noteModel = require('./model')

module.exports = {
    async getNotes() {
        return await noteModel.find().populate('parentFolder')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getNote(id) {
        return await noteModel.findById(id).populate('parentFolder')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createNote(parentFolderId, name, content) {
        const newNote = await noteModel({
            name: name,
            content: content,
            parentFolder: parentFolderId
        })

        return newNote.save()
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async updateNote(id, name, content) {
        return noteModel.findByIdAndUpdate(id, {
            name: name,
            content: content
        }, { new: true})
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async deleteNote(id) {
        return noteModel.findByIdAndDelete(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}