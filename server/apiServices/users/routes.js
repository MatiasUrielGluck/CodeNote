const express = require('express')
const controller = require('./controller')
const router = express.Router({mergeParams: true})
const foldersRoutes = require('../folders/routes')
const passport = require('passport')

// router.use('/:userId/folders', foldersRoutes)

router.post('/', controller.createUser)

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.send({ success : false, message : 'authentication failed' });
        }
        req.login(user, loginErr => {
        if (loginErr) {
            return next(loginErr);
        }
        return res.send({ success : true, message : 'authentication succeeded' });
        });      
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err) }
    })
    res.sendStatus(200)
})

router.patch('/:userId', controller.updateUser)
router.delete('/:userId', controller.deleteUser)

module.exports = router