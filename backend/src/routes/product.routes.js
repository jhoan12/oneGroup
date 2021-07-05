const {Router} = require('express')
const productsCtrl = require('../controllers/product.controllers')
const protegida = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const route = Router()

route.get('/products/:user', protegida, productsCtrl.productsUser)
route.get('/product/:id', protegida, productsCtrl.productId)
route.post('/add', protegida, upload.single("img"), productsCtrl.addProduct)
route.put('/update/:id', protegida, upload.single("img"), productsCtrl.update)
route.delete('/delete/:id', protegida, productsCtrl.delete)

module.exports = route