const mongoose = require("mongoose");
const joi = require("joi");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  image : {
    type: String,
    required: false,
    default: "avatar.png",
  },
}, { timestamps: true });


const Author = mongoose.model("Author", authorSchema);

const validateCreate  = (object) => {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200).required(),
    lastName: joi.string().trim().min(3).max(200).required(),
    nationality: joi.string().trim().min(2).max(100).required(),
    image: joi.string().trim(),
  });
  return schema.validate(object);
};

const validateUpdate  = (object) => {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200),
    lastName: joi.string().trim().min(3).max(200),
    nationality: joi.string().trim().min(2).max(100),
    image: joi.string().trim(),
  });
  return schema.validate(object);
};


module.exports = { Author, validateCreate, validateUpdate };