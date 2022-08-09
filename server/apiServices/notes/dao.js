const mongoose = require('mongoose')
const noteModel = require('./model')
const folderModel = require('../folders/model')

module.exports = {
    async getNotes(folderId) {
        return await noteModel.find({
            parentFolder: folderId
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getNote(id) {
        return await noteModel.findById(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createNote(parentFolderId, name) {
        const newNote = await noteModel({
            name: name,
            content: '',
            parentFolder: parentFolderId
        })

        const folder = await folderModel.findById(parentFolderId)
        folder.notes.push(newNote._id)
        await folder.save()
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

    async deleteNote(parentFolderId, id) {
        const folder = await folderModel.findById(parentFolderId)
        folder.notes.splice(folder.notes.find(element => element === id), 1)
        await folder.save()

        return noteModel.findByIdAndDelete(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}