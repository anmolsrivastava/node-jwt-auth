const Joi = require('joi')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const {User} = require('../models')
const validation = require('./../validation')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const validationErrors = validation.validateRegisterUser(req.body).error;
            if(validationErrors && validationErrors.details) {
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
        catch(error) {
            console.log('####',error)
            res.status(500).send({
                status: false,
                message: 'Internal Server Error'
            })
        }
    }
}