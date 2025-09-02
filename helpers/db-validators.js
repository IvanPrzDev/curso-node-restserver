const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
        const existsRole = await Role.findOne({ role });
        if (!existsRole) {
            throw new Error(`Role ${role} is not registered in the database`);
        }
    }

const isValidEmail = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`Email ${email} is already registered in the database`);
    }
}

const isValidUserId = async (id = '') => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`User ID ${id} is not registered in the database`);
    }
}


module.exports = {
    isValidRole,
    isValidEmail,
    isValidUserId
};

