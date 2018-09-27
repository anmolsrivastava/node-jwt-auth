const Joi = require('joi')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { User } = require('../models')
const validation = require('./../validation')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const validationErrors = validation.validateRegisterUser(req.body).error;
            if (validationErrors && validationErrors.details) {
                res.status(400).send({
                    name: 'Validation Error',
                    message: validationErrors.details[0].message
                })
            } else {
                let hash = await bcrypt.hash(req.body.password, 10)
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role
                })
                await user.save()
                res.status(200).json({
                    success: 'New user has been created'
                });
            }
        }
        catch (err) {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        }
    },
    login: async (req, res) => {
        try {
            let findUser = await User.findOne({ email: req.body.email })
            if (findUser) {
                let checkPassword = await bcrypt.compare(req.body.password, findUser.password)
                if (checkPassword) {
                    const JWTToken = jwt.sign({
                        email: findUser.email,
                        username: findUser.username,
                        _id: findUser._id,
                        role: findUser.role
                    },
                        'secret',
                        {
                            expiresIn: '24h'
                        });
                    return res.status(200).send({
                        status: true,
                        message: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
                return res.status(400).send({
                    status: false,
                    message: 'Invalid Password'
                })
            }
            return res.status(400).send({
                status: false,
                message: 'Invalid Email'
            })
        }
        catch (err) {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        }
    },
    getData: async (req, res) => {
        try {
            let user = await User.findById(req.user._id, { __v: 0 })
            res.status(200).send(user)
        }
        catch (err) {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        }
    },
    getUserById: async (req, res) => {
        try {
            let id = mongoose.Types.ObjectId.isValid(req.params.id)
            if (id) {
                let user = await User.findById(req.params.id, { __v: 0 })
                if (user) {
                    res.status(200).send(user)
                } else {
                    res.status(400).send({
                        message: 'User does not exist'
                    })
                }
            } else {
                res.status(400).send({
                    message: 'Invalid Id'
                })
            }
        }
        catch (err) {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        }

    },
    getUsersList: async (req, res) => {
        try {
            let users = await User.find({}, { __v: 0 })
            res.status(200).send(users)
        }
        catch (err) {
            res.status(500).send({
                message: 'Internal Server Error'
            })
        }
    }
}