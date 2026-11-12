const router = require('express').Router()
const { addProduct, getOneProduct, updateProduct, getAllProducts, deleteProduct } = require('../controllers/productController')
const { upload } = require('../middlewares/multer')


router.post('/products', upload.single('productImage') , addProduct)
router.get('/products', getAllProducts )
router.get('/products/:id',  getOneProduct)
router.put('/products/:id', upload.single('productImage') , updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router