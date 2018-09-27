const express = require('express');
const router = express.Router();

const { user } = require('./../controllers')
const { auth } = require('./../lib')

router.post('/register', user.registerUser)
router.post('/login', user.login)

router.use('/', auth.checkToken, auth.verifyToken)

router.get('/user/data', checkEditor, user.getData)

router.get('/user/list', checkAdmin, user.getUsersList)
router.get('/user/:id', checkAdmin, user.getUserById)


function checkAdmin(req, res, next) {
    if (req.user.role === 'admin') return next()
    else res.status(403).send({
        message: 'User does not have permission'
    })
}

function checkEditor(req, res, next) {
    if (req.user.role === 'editor') return next()
    else res.status(403).send({
        message: 'User does not have permission'
    })
}

module.exports = router