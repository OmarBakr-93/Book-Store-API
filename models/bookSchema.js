const mongoose = require("mongoose");
const joi = require("joi");


const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 250
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cover: {
    type: String,
    required: true,
    enum: ["hardcover", "softcover", "ebook"]
  },
}, { timestamps: true }
);


const Book = mongoose.model("Book", BookSchema);

const validateCreateBook  = (object) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(250).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).max(500).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().valid("hardcover", "softcover", "ebook").required(),
  });
  return schema.validate(object);
};

const validateUpdateBook  = (object) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(250).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).max(500).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().valid("hardcover", "softcover", "ebook").required(),
  });
  return schema.validate(object);
};


module.exports = { Book, validateCreateBook, validateUpdateBook };