const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password){
    return res.status(400).json({message: "Username/Password is invalid."});
  }

  if (users.find(user => user.username === username)){
    return res.status(400).json({message: "Username/Password is invalid."});
  }
  
  users.push({"username":username, "password": password});

  return res.status(200).json({message: "registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let bookPromise = new Promise((resolve,reject) => {
    resolve(books)    
    })
    bookPromise.then(result => res.status(200).json(JSON.stringify(result)));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let bookPromise = new Promise((resolve,reject) => {
    resolve(books[isbn])    
    })
    bookPromise.then(result => res.status(200).json(JSON.stringify(result)));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;