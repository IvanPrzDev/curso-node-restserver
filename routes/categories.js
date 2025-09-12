const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

// obtain categories - public
router.get('/', getCategories);


// obtain category by id - public
router.get('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], getCategory);

// create category - private - any valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);

// update category - private - any valid token
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields
], updateCategory);

// delete category (state: false) - private - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], deleteCategory);

module.exports = router;