const Joi = require("joi");

const createValidation = Joi.object({
    title: Joi.string().required().min(3),
    section_id : Joi.string().required().min(8),
    project_id : Joi.string().required().min(8),
});

const updateValidation = Joi.object({
    title: Joi.string().min(3),
    due_date : Joi.date(),
});

module.exports = {
    createValidation,
    updateValidation
}