const validatesFields = require('../middlewares/fields-validation');
const validatesJWT = require('../middlewares/jwt-validation');
const validatesAdminRole = require('../middlewares/admin-role-validation');

module.exports = {
    ...validatesFields,
    ...validatesJWT,
    ...validatesAdminRole
};