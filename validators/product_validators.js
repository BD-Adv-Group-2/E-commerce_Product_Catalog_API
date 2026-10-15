const Joi = require("joi");

const postProductSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().required(),
    description: Joi.string().min(5).required(),
    category: Joi.string().min(2).required(),
    inStock: Joi.boolean().default(true)
})

const validateProductCreate = (req, res, next) => {
    const { error } = postProductSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next()
}


const updateProductSchema = Joi.object({
    name: Joi.string().min(2),
    price: Joi.number().min(0),
    description: Joi.string().min(5),
    category: Joi.string().min(2),
    inStock: Joi.boolean()
})

const validateProductUpdate = (req, res, next) => {
    const { error } = updateProductSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next()
}

module.exports = { validateProductCreate, validateProductUpdate }