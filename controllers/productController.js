const {Product} = require('../models');
const fs = require('fs')


exports.addProduct = async (req, res) => {
    try {
        const { productName, price, stock} = req.body
        const file = req.file.path

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        })

        
        res.status(201).json({
            message: 'Product added successfuly',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()

        res.status(200).json({
            message: `all products in the database found and the total is ${products.length}`,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product found',
            data: product
        })
    } catch (error) {
       res.status(500).json({
            message: error.message
        }) 
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { productName, price, stock } = req.body
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const data = {
            productName,
            price,
            stock
        }

        // Update file only when there is file in the request
        if (req.file) {
            const oldFilePath = product.productImage;
            fs.unlinkSync(oldFilePath)

            data.productImage = req.file.path
        }

        const updatedProduct = await product.update(data)

        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const productPath = product.productImage
        fs.unlinkSync(productPath)
        await product.destroy()

        res.status(200).json({
            message:'Product removed successfully'
        })

    } catch (error) {
       res.status(500).json({
            message: error.message
        }) 
    }
}