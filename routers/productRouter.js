const router = require('express').Router()
const { addProduct, getOneProduct, updateProduct, getAllProducts, deleteProduct } = require('../controllers/productController')
const { upload } = require('../middlewares/multer')
const { addProductValidator, updateProductValidator } = require('../middlewares/productValidator')


router.post('/products', upload.single('productImage'), addProductValidator , addProduct)
router.get('/products', getAllProducts )
router.get('/products/:id',  getOneProduct)
router.put('/products/:id',  upload.single('productImage') , updateProductValidator, updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router