const express = require('express');
const router = express.Router();
const bookController = require('./controller/bookController');
const authorController = require('./controller/authorController');
const tagController = require('./controller/tagController');
const statusController = require('./controller/statusController');
const userController = require('./controller/userController');

// Books url
router.get('/books', bookController.getAllBooksFromUser);
router.post('/books', bookController.postOneBook);
router.get('/books/:bookId', bookController.getOneBook);
router.patch('/books/:bookId', bookController.editOneBook);
router.delete('/books/:bookId', bookController.deleteOneBook);

// Authors url
router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:authorId', authorController.getOneAuthor);
router.post('/authors/:authorId', authorController.postOneAuthor);
router.patch('/authors/:authorId', authorController.editOneAuthor);
router.delete('/authors/:authorId', authorController.deleteOneAuthor);
router.get('/authors/:authorId/books', authorController.getBooksByAuthor);

// Tags url
router.get('/tags', tagController.getAllTags);
router.get('/tags/:tagId', tagController.getAllBooksFromTag);
router.post('/tags/:tagId', tagController.postOneTag);
router.patch('/tags/:tagId', tagController.editOneTag);
router.delete('/tags/:tagId', tagController.deleteOneTag);
router.get('/tags/:tagId/books', tagController.getBooksByTag);

// Status url
router.get('/status', statusController.getAllStatus);
router.get('/status/:statusId', statusController.getAllBooksFromStatus);

// Users url
router.post('/user', userController.postUser);
router.get('/user/:userId', userController.getUser);
router.patch('/user/:userId', userController.editUser);
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;
