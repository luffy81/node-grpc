// validation.js
const Joi = require('joi');

class ValidationError extends Error {
    constructor(details) {
        super('Validation error');
        this.name = 'ValidationError';
        this.details = details;
    }
}

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const productSchema = Joi.object({
    id: Joi.number().integer().min(0).max(10).required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    postImage: Joi.string().required(),
});

const validate = (request) => {
    const { error } = productSchema.validate(request);
    if (error) {
        throw new ValidationError(error.details);
    }
}

module.exports = {
    validate,
    ValidationError,
};
