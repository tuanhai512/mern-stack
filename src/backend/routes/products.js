const express = require('express');
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProducts,
    updateProduct,
    deleteProduct
    
} = require('../controller/productController');


router.route('/products').get(getProducts);
router.route('/admin/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProducts);
router.route('/admin/product/:id')
                .put(updateProduct)
                .delete(deleteProduct);

module.exports = router;