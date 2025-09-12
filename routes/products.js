const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');
const { existProductById, existCategoryById } = require('../helpers/db-validators');

const router = Router();

// obtain products - public
router.get('/', getProducts);


// obtain product by id - public
router.get('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], getProduct);

// create product - private - any valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Not a valid ID').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
], createProduct);

// update product - private - any valid token
router.put('/:id', [
    validateJWT,
    // check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], updateProduct);

// delete product (state: false) - private - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], deleteProduct);

module.exports = router;