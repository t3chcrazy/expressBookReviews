const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  if (!isValid(username)) {
    return res.status(400).json({message: "Username already exists"});
  }
  users.push({ username, password });
  return res.status(200).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookByISBN = books[req.params.isbn];
  if (!bookByISBN) {
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(bookByISBN);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const booksByAuthor = Object.values(books).filter(book => book.author === req.params.author);
  if (!booksByAuthor?.length) {
    return res.status(404).json({message: "No books found by this author"});
  }
  return res.status(200).json(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const booksByTitle = Object.values(books).filter(book => book.title === req.params.title);
  if (!booksByTitle?.length) {
    return res.status(404).json({message: "No books found with this title"});
  }
  return res.status(200).json(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviewsByISBN = books[req.params.isbn]?.reviews;
  if (!reviewsByISBN) {
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(reviewsByISBN);
});

module.exports.general = public_users;
