// This code can be used everytime you want to start 
// a server with controllers and models folder

const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Paths
    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      products:   '/api/products',
      search:     '/api/search',
      users:      '/api/users',
      uploads:    '/api/uploads',
    };

    // Database connection
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Initialize jobs/cronjobs
    this.initializeJobs();
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

    //File upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  initializeJobs() {
    // Import and start cronjobs
    require('../jobs');
    console.log('🤖 Background jobs initialized');
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

}

module.exports = Server;
