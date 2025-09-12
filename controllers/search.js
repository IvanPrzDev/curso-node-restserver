const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const {User, Category, Product} = require('../models');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // Check if term is a valid MongoDB ID

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i'); // Case insensitive regex
    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // Check if term is a valid MongoDB ID

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i'); // Case insensitive regex
    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories
    });
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term); // Check if term is a valid MongoDB ID

    if (isMongoId) {
        const product = await Product.findById(term)
            .populate('category', 'name')
            .populate('user', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i'); // Case insensitive regex
    const products = await Product.find({ name: regex, state: true })
        .populate('category', 'name')
        .populate('user', 'name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allowed collections are: ${allowedCollections}`
        });
    }

    switch (collection) {
        case 'users':
            // Search in users collection
            searchUsers(term, res);
            break;

        case 'categories':
            // Search in categories collection
            searchCategories(term, res);
            break;

        case 'products':
            // Search in products collection
            searchProducts(term, res);
            break;

        case 'roles':
            // Search in roles collection
            
            break;

        default:
            return res.status(500).json({
                msg: 'Search not implemented for this collection'
            });
    }
}

module.exports = {
    search
}