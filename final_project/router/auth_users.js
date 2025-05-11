const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
  return !users.find(user => user.username === username)
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({message: "Invalid username or password"});
  }
  const token = jwt.sign({ username }, "fingerprint_customer");
  req.session.authorization = {
    accessToken: token,
    username: username
  }
  return res.status(200).json({message: "User successfully logged in", token: token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  console.log({ isbn, session: req.session })
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  const { review } = req.body;
  console.log({ review })
  if (!review) {
    return res.status(400).json({message: "Review is required"});
  }
  books[isbn].reviews[req.session.authorization.username] = review;
  return res.status(200).json({message: "User review added successfully!", book: books[isbn]});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  if (!books[isbn].reviews[req.session.authorization.username]) {
    return res.status(404).json({message: "No review found for this user"});
  }
  delete books[isbn].reviews[req.session.authorization.username];
  return res.status(200).json({message: "User review deleted successfully!", book: books[isbn]});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
