const User = require('./user');
const Author = require('./author');
const Tag = require('./tag');
const Book = require('./book');
const Status = require('./status');

//! Association book - user
// Un user peut posséder plusieurs livres
User.hasMany(Book, {
  as: 'booksFromUser',
  foreignKey: 'user_id',
});

// Un livre est possédé par un seul user
Book.belongsTo(User, {
  as: 'userOfBook',
  foreignKey: 'user_id',
});

//! Association book - author
// Un livre est écrit par un auteur
Book.belongsTo(Auhor, {
  as: 'authorOfBook',
  foreignKey: 'author_id',
});

// Un auteur peut écrire plusieurs livres
Author.hasMany(Book, {
  as: 'booksFromAuthor',
  foreignKey: 'author_id',
});

//! Association book - tag
// Un livre peut appartenir à une seule catégorie
Book.belongsTo(Tag, {
  as: 'tagOfBook',
  foreignKey: 'tag_id',
});

// Une catégorie peut être appartenue par plusieurs livres
Tag.hasMany(Book, {
  as: 'booksFromTags',
  foreignKey: 'tag_id',
});

//! Association book - status
// Un livre peut avoir un seul statut
Book.belongsTo(Status, {
  as: 'statusOfBook',
  foreignKey: 'status_id',
});

// Un statut peut être appartenu par plusieurs livres
Status.hasMany(Book, {
  as: 'booksFromStatus',
  foreignKey: 'status_id',
});

module.exports = { User, Author, Tag, Book, Status };
