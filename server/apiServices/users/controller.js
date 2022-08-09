const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./model')

module.exports = {
    async createUser(req, res) {
        const { email, password } = req.body

        try {
            const newUser = new User({
                folders: [],
                username: email
            })
            const registeredUser = await User.register(newUser, password)
        }
        catch(err) {
            return res.sendStatus(401)
        }
        res.sendStatus(200)
    },
    
    async updateUser(req, res) {
        const { userId } = req.params
        const { password } = req.body
        const user = await userDao.updateUser(userId, password)
        res.send(JSON.stringify(user))
    },

    async deleteUser(req, res) {
        const { userId } = req.params
        const user = await userDao.deleteUser(userId)
        res.send(JSON.stringify(user))
    }
}