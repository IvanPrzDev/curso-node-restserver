require('dotenv').config();
const Server = require('./models/server');
const port = process.env.PORT;

const server = new Server();

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`)
});
