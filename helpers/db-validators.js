const Role = require('../models/role');
const {User, Category, Product} = require('../models');

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

// categories validators
const existCategoryById = async (id = '') => {
    const existsCategory = await Category.findById(id);
    if (!existsCategory) {
        throw new Error(`Category ID ${id} is not registered in the database`);
    }
}

// products validators
const existProductById = async (id = '') => {
    const existsProduct = await Product.findById(id);
    if (!existsProduct) {
        throw new Error(`Product ID ${id} is not registered in the database`);
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    isValidUserId,
    existCategoryById,
    existProductById
};

