const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif', 'pdf'], folder = '') => {

return new Promise((resolve, reject) => {
  const { file } = files;
  const cutName = file.name.split('.');
  const extension = cutName[cutName.length - 1];

    // Validate extension
    if (!validExtensions.includes(extension)) {
        return reject({msg: `The extension ${extension} is not allowed - ${validExtensions}`
        });
    }
  
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            reject({msg: 'Error moving the file'});
        }

        resolve({
            msg: 'File uploaded successfully',
            tempName
        });
    });
  });
}

module.exports = {
    uploadFile
}