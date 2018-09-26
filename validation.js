const Joi = require('joi');

// Make Schema for validate schemaGetContact
let schemaGetContactById = Joi.object().keys({
    id: Joi.array().items(Joi.number()).required()
});


// Make Schema for validate schemaCreateContact

let schemaEmail = Joi.object().keys({
    email: Joi.string().email().required(),
    primary: Joi.bool().optional(),
    errorMsg: Joi.string().allow('').optional()
})

let schemaNumber = Joi.object().keys({
    phone: Joi.string().required(),
    primary: Joi.bool().optional(),
    errorMsg: Joi.string().allow('').optional()
})

let schemaAddress = Joi.object().keys({
    address1: Joi.string().optional(),
    address2: Joi.string().optional(),
    address3: Joi.string().optional(),
    address_type: Joi.number().optional(),
    city: Joi.number().optional(),
    state: Joi.number().optional(),
    country: Joi.number().optional(),
    zipcode: Joi.string().optional(),
})

let schemaRegisterUser = {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(['editor', 'admin'])
    /*fname: Joi.string().required(),
    title: Joi.string().allow('').optional(),
    dob: Joi.string().allow('').optional(),
    lname: Joi.string().allow('').optional(),
    intl_code: Joi.string().allow('').optional(),
    designation: Joi.string().allow('').optional(),
    department: Joi.string().allow('').optional(),
    organisation: Joi.string().allow('').optional(),
    contactEmails: Joi.array().min(1).items(schemaEmail).required(),
    contactNumbers: Joi.array().min(1).items(schemaNumber).required(),
    groups: Joi.number().allow('').optional(),*/
    //serviceIds: Joi.array().items(Joi.number().required()).optional(),
    //addresses: Joi.array().items(schemaAddress).optional()
};


const validateRegisterUser = (ServiceTypeInput) => {
    return Joi.validate(ServiceTypeInput, schemaRegisterUser, { presence: 'required'});
}


module.exports = {
    validateRegisterUser
}
