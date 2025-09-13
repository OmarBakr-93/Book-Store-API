const express = require("express");
const app = express();

const logger = require("./middlewares/loggerMiddleware");
const BookRoutes = require("./routes/booksRoutes");
const AuthorRoutes = require("./routes/authorsRoutes");
const { notFound, errorHandler} = require("./middlewares/errorHandler");

require("dotenv").config();

const connectDB = require("./config/DB");
connectDB();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/books", BookRoutes);
app.use("/authors", AuthorRoutes);
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});