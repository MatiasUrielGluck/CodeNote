const mongoose = require('mongoose')
const folderModel = require('./model')
const userModel = require('../users/model')

module.exports = {
    async getFolders(userId) {
        return await folderModel.find({
            userId: userId
        }).populate('notes')
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
    
    async createFolder(userId, name) {
        const newFolder = await folderModel({
            userId: userId,
            name: name,
            notes: []
        })

        const loggedUser = await userModel.findById(userId)
        loggedUser.folders.push(newFolder._id)
        await loggedUser.save()

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

    async deleteFolder(userId, id) {
        const loggedUser = await userModel.findById(userId)
        loggedUser.folders.splice(loggedUser.folders.find(element => element === id), 1)
        await loggedUser.save()
        
        return folderModel.findByIdAndDelete(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}