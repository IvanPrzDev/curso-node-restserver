const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');



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


const googleSignIn = async (req, res = response) => {
  
  const { id_token, credential } = req.body;
  const googleToken = id_token || credential;

  try {
    const { email, name, picture } = await googleVerify(googleToken);

    // Check if user exists
    let user = await User.findOne({email});
    if (!user) {
    // Create user
      const data = {
        name,
        email,
        password: ':P',
        img: picture,
        google: true,
        role: 'USER_ROLE'
      };

      user = new User(data);
      await user.save();
    }

    // If user in DB
    if (!user.state) {
      return res.status(401).json({
        msg: 'Talk to the administrator, user blocked'
      });
    }

    // Generate JWT
    const jwt = await generateJWT(user.id);

    res.json({
      user,
      token: jwt
    });

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid Google token'
    });
  }

  
}

module.exports = {
  login,
  googleSignIn
};
