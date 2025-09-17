const validatesFields    = require('../middlewares/fields-validation');
const validatesJWT       = require('../middlewares/jwt-validation');
const validatesAdminRole = require('../middlewares/admin-role-validation');
const validatesUploadFile = require('../middlewares/file-validator');

module.exports = {
    ...validatesFields,
    ...validatesJWT,
    ...validatesAdminRole,
    ...validatesUploadFile
};
