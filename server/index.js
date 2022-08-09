const express = require('express')
const app = express()
const config = require('./config')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CodeNote');
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./apiServices/users/model')

const usersRoutes = require('./apiServices/users/routes')
const foldersRoutes = require('./apiServices/folders/routes')

// Basic middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'movethissecrettoenvvariables',
    saveUninitialized: false,
    resave: false
}))

// Passport middlewares
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Routes middlewares
app.use('/users', usersRoutes)
app.use('/folders', foldersRoutes)

// ====================
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`)
})