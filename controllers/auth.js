const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');



const login = async (req, res = response) => {

const { email, password } = req.body;

try{

  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: 'User / Password incorrect - email'
    });
  }

  // Check if user state is active
  if (!user.state) {
    return res.status(400).json({
      msg: 'User / Password incorrect - state: false'
    });
  }

  // Check if password is correct
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: 'User / Password incorrect - password'
    });
  }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    });
}catch(error){
    console.log(error);
    res.status(500).json({
        msg: 'Internal Server Error'
    });
}
};

module.exports = {
  login
};
