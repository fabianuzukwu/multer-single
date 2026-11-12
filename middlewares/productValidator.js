const Joi = require('joi')

exports.addProductValidator = (req, res, next) => {
    const productSchema = Joi.object({
        productName: Joi.string().trim().regex(/^(?=[a-zA-Z0-9 ]{3,}$)[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/).required().messages({
            'any.required': "Product Name is required",
            'string.empty': "Product Name cannot be empty",
            'string.pattern.base': "Product Name must be at least 3 characters long, start and end with letters or numbers, and contain only letters , numbers and spaces."
        }),
        price: Joi.number().integer().min(1).required().messages({
            'any.required': "Price is required",
            'number.empty': "Price cannot be empty",
            'number.base': "Price must be a number",
            'number.min': "Price must be at least 1 digit long"
        }),
        stock:Joi.number().integer().min(1).required().messages({
            'any.required': "Stock is required",
            'number.empty': "Stock cannot be empty",
            'number.base': "Stock must be a number",
            'number.min': "Stock must be at least 1 digit long"
        })
    })

    const { error }= productSchema.validate(req.body)
    if (error) {
        console.log(error.details[0])
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()
}

exports.updateProductValidator = (req, res, next) => {
     const productSchema = Joi.object({
        productName: Joi.string().trim().regex(/^(?=[a-zA-Z0-9 ]{3,}$)[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/).optional().messages({
            'string.empty': "Product Name cannot be empty",
            'string.pattern.base': "Product Name must be at least 3 characters long, start and end with letters or numbers, and contain only letters , numbers and spaces."
        }),
        price: Joi.number().integer().min(1).optional().messages({
            'number.empty': "Price cannot be empty",
            'number.base': "Price must be a number",
            'number.min': "Price must be at least 1 digit long"
        }),
        stock:Joi.number().trim().min(1).optional().messages({
            'number.empty': "Stock cannot be empty",
            'number.base': "Stock must be a number",
            'number.min': "Stock must be at least 1 digit long"
        })
    })

    const { error }= productSchema.validate(req.body)
    if (error) {
        console.log(error.details[0])
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()
}