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
            content: `<h1>${name}</h1>`,
            parentFolder: parentFolderId
        })

        const folder = await folderModel.findById(parentFolderId)
        folder.notes.push(newNote._id)
        await folder.save()
        
        return await newNote.save()
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async updateNote(id, name, content) {
        console.log(typeof(name), typeof(content))
        return await noteModel.findByIdAndUpdate(id, {
            name: name,
            content: content
        }, { new: true})
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {
            console.log(err)
            return err
        })
    },

    async deleteNote(parentFolderId, id) {
        const folder = await folderModel.findById(parentFolderId)
        // folder.notes.splice(folder.notes.find(element => element.equals(id)), 1)
        let newNotesList = []
        for (const note of folder.notes) {
            if (!note.equals(id)) {
                newNotesList.push(note)
            }
        }
        folder.notes = newNotesList
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