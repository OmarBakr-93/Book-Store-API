const express = require("express");
const router = express.Router();
const { Book, validateCreateBook, validateUpdateBook } = require("../models/bookSchema");
const asyncHandler = require("express-async-handler");

/**
 * @description Get all Books
 * @route /books
 * @method GET 
 * @access Public
 */
router.get("/", asyncHandler(async (req, res) => {

  const books = await Book.find().populate("author",["firstName", "lastName"]);
  res.json(books);

  res.status(500).json({ error: "An error occurred while fetching books" });
}));

/**
 * @description Create a new Book
 * @route /books
 * @method POST 
 * @access Public
 */

router.post("/", asyncHandler( async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {

    return res.status(400).json({ error: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
    const newBook = await book.save();
    res.status(201).json(newBook);
    res.status(500).json({ error: "An error occurred while creating the book" });
  }
));

/**
 * @description Get a Book by ID
 * @route /books/:id
 * @method GET 
 * @access Public
 */
router.get("/:id", asyncHandler( async(req, res) => {

  const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  
    res.status(500).json({ error: "An error occurred while fetching the book" });
  }
));

/**
 * @description Update a Book by ID
 * @route /books/:id
 * @method PUT 
 * @access Public
 */

router.put("/:id", asyncHandler( async(req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      }
    }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook).status(200);
    res.status(500).json({ error: "An error occurred while updating the book" });
  }
));

/**
 * @description Delete a Book by ID
 * @route /books/:id
 * @method Delete 
 * @access Public
 */

router.delete("/:id", asyncHandler( async(req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json({ message: "Book deleted successfully" }).status(200);

  res.status(500).json({ error: "An error occurred while deleting the book" });
}
));


module.exports = router;