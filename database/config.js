const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = {
    dbConnection
};
