

const {Router} = require('express');

const {check} = require('express-validator');

const {isValidRole, isValidEmail, isValidUserId} = require('../helpers/db-validators');

const {validateFields} = require('../middlewares/fields-validation');

const {getUser, postUser, putUser, patchUser, deleteUser} = require('../controllers/user');

const router = Router();

router.get('/', getUser);

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(isValidUserId),
    check('role').custom(isValidRole),
    validateFields
], putUser);

router.post('/', [
    // middlewares can be added here for validation
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory, at least 6 characters').isLength({ min: 6 }),
    check('email', 'Email is mandatory').isEmail(),
    check('email').custom(isValidEmail),
    check('role').custom(isValidRole),
    validateFields
], postUser);

router.patch('/', patchUser);

router.delete('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(isValidUserId),
    validateFields
], deleteUser);

module.exports = router;



