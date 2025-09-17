


const dbValidators = require('../helpers/db-validators');
const generateJWT  = require('../helpers/generate-jwt');
const googleVerify = require('../helpers/google-verify');
const uploadFile   = require('../helpers/upload-file');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}