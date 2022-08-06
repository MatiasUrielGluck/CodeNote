const mongoose = require('mongoose')
const folderModel = require('./model')

module.exports = {
    async getFolders() {
        return await folderModel.find().populate('notes')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getFolder(id) {
        return await folderModel.findById(id).populate('notes')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createFolder(name) {
        const newFolder = await folderModel({
            name: name,
            notes: []
        })

        return newFolder.save()
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async updateFolder(id, name) {
        return folderModel.findByIdAndUpdate(id, {
            name: name
        }, { new: true})
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async deleteFolder(id) {
        return folderModel.findByIdAndDelete(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}