const path = require('path');
const fs = require('fs');
const {response} = require("express");
const { uploadFile } = require("../helpers/upload-file");
const {User, Product} = require('../models');
const { constants } = require('buffer');

const loadFile = async (req, res = response) => {

  try {
    const name = await uploadFile(req.files, undefined, 'imgs');
    res.json({ name });


  } catch (msg) {
    res.status(400).json({ msg });
  }
}

const updateImage = async (req, res = response) => {
  
  const { id, collection } = req.params;

  let model;
  
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No user found with id ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No product found with id ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'This validation is not implemented' });
  }

  // Clean previous images
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const result = await uploadFile(req.files, undefined, collection);
  model.img = result.tempName || result.name || result;

  await model.save();

  res.json(model);
}

const getImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;
  
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No user found with id ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No product found with id ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'This validation is not implemented' });
  }

  // Clean previous images
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  // Default image
  const defaultImage = path.join(__dirname, '../assets/no-image.jpeg');
  if (fs.existsSync(defaultImage)) {
    return res.sendFile(defaultImage);
  }
  // Si no existe la imagen default, responde con 404
  res.status(404).json({ msg: 'Image not found' });
}

module.exports = {
    loadFile,
    updateImage,
    getImage
}