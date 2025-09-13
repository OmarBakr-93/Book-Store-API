const express = require("express");
const router = express.Router();
const { Author, validateCreate, validateUpdate } = require("../models/authorSchema");
const asyncHandler = require("express-async-handler");


/**
 * @description Get all Authors
 * @route /authors
 * @method GET 
 * @access Public
 */
router.get("/", asyncHandler(async (req, res) => {

    const authors = await Author.find()
    res.json(authors);

    res.status(500).json({ error: "An error occurred while fetching authors" });
}));


/**
 * @description Create a new Author
 * @route /authors
 * @method POST 
 * @access Public
 */

router.post("/", asyncHandler( async (req, res) => {
  const { error } = validateCreate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
    res.status(500).json({ error: "An error occurred while creating the author" });
  }
));

/**
 * @description Get a Author by ID
 * @route /authors/:id
 * @method GET 
 * @access Public
 */
router.get("/:id", asyncHandler( async(req, res) => {

    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  
    res.status(500).json({ error: "An error occurred while fetching the author" });
  }
));

/**
 * @description Update a Author by ID
 * @route /authors/:id
 * @method PUT 
 * @access Public
 */

router.put("/:id", asyncHandler( async(req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
    const { id } = req.params;
    const updatedAuthor = await Author.findByIdAndUpdate(id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      }
    }, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(updatedAuthor).status(200);
    res.status(500).json({ error: "An error occurred while updating the author" });
  }
));

/**
 * @description Delete a Author by ID
 * @route /authors/:id
 * @method Delete 
 * @access Public
 */

router.delete("/:id", asyncHandler( async(req, res) => {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json({ message: "Author deleted successfully" }).status(200);

    res.status(500).json({ error: "An error occurred while deleting the author" });
  }
));


module.exports = router;