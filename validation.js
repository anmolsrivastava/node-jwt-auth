const Joi = require('joi');

let schemaRegisterUser = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/).required(),
    role: Joi.string().valid(['editor', 'admin']).required()
};


const validateRegisterUser = (ServiceTypeInput) => {
    return Joi.validate(ServiceTypeInput, schemaRegisterUser, { presence: 'required' });
}

module.exports = {
    validateRegisterUser
}
