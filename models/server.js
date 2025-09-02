// This code can be used everytime you want to start 
// a server with controllers and models folder

const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const {dbConnection} = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Database connection
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Body parser
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {

    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

}

module.exports = Server;
