var express = require('express');

import * as categoriesController from '../controller/categories.controller';
import * as productsController from '../controller/products.controller';

const router = express.Router();

// Product route call
router.route('/products')
    .get(productsController.allProducts);

router.route('/product')
    .post(productsController.addProduct);


// Category route call
router.route('/categories')
    .get(categoriesController.allCategory)
    
router.route('/category')
    .post(categoriesController.addCategory);

router.route('/category/:id')
    .delete(categoriesController.deleteCategory)

export default router;


