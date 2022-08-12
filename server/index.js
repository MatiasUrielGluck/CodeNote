require('dotenv').config({ path: 'development.env' })

const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
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
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
    console.log(`Listening on port ${port}...`)
})