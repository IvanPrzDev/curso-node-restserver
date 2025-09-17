const {Router} = require('express');
const { response } = require('express');
const {check} = require('express-validator');
const {validateFields, validateUploadFile} = require('../middlewares');
const {loadFile, updateImage, getImage} = require('../controllers/uploads');
const { validCollections } = require('../helpers');

const router = Router();

router.post('/', validateUploadFile, loadFile);

router.put('/:collection/:id', [ 
  validateUploadFile,
  check('id', 'Invalid ID').isMongoId(),
  check('collection').custom(c => validCollections(c, ['users', 'products'])),
  validateFields
], updateImage);

router.get('/:collection/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('collection').custom(c => validCollections(c, ['users', 'products'])),
  validateFields
], getImage);






module.exports = router;