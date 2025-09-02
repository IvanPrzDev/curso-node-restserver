const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');



const getUser = async (req = request, res = response) => {

  const {limit = 5, from = 0} = req.query;
  const query = {state: true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  });
}

const putUser = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if(password){
        // Hash the password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}

const postUser = async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    // Hash the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();

    res.status(201).json({
      user 
    });
}

const patchUser = (req, res = response) => {
    res.status(200).json({
      message: 'Patch API - patchUser'
    });
}

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.status(200).json(user);
}



module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};
