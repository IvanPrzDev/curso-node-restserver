const {response} = require('express');
 

const getUser = (req, res = response) => {

    const {q, name = 'No name', apikey, page = 1, limit} = req.query;

    res.status(200).json({
      message: 'Get API - getUser',
      q,
      name,
      apikey,
      page,
      limit
    });
}

const putUser = (req, res = response) => {

    const {id} = req.params;

    res.status(200).json({
      message: 'Put API - putUser',
      id
    });
}

const postUser = (req, res = response) => {

    const {name, age} = req.body;

    res.status(201).json({
      message: 'Post API - postUser',
      name,
      age
    });
}

const patchUser = (req, res = response) => {
    res.status(200).json({
      message: 'Patch API - patchUser'
    });
}

const deleteUser = (req, res = response) => {
    res.status(200).json({
      message: 'Delete API - deleteUser'
    });
}



module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};
