const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./model')

module.exports = {
    async getUsers() {
        return await userModel.find()
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    async getUser(id) {
        return await userModel.findById(id).populate('folders')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },
    
    async createUser(email, password) {
        
    },

    async updateUser(id, name, content) {
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

    async deleteUser(id) {
        return noteModel.findByIdAndDelete(id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}