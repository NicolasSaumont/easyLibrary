const User = require('./user');
const Question = require('./question');
const Tag = require('./tag');
const Comment = require('./comment');

//! Association user - commentaire
// Un user peut créer plusieurs commentaires
User.hasMany(Comment, {
  as: 'commentsFromUser',
  foreignKey: 'user_id',
});

// Un commentaire est créée par un seul user
Comment.belongsTo(User, {
  as: 'userOfComment',
  foreignKey: 'user_id',
});

//! Association commentaire - question
// Un commentaire précise une question
Comment.belongsTo(Question, {
  as: 'questionOfComment',
  foreignKey: 'question_id',
});

// Une question peut être précisée par plusieurs commentaires
Question.hasMany(Comment, {
  as: 'commentsFromQuestion',
  foreignKey: 'question_id',
});

//! Association tag - question
// Une question peut appartenir a plusieurs tags
Question.belongsToMany(Tag, {
  through: 'question_has_tag',
  foreignKey: 'question_id',
  otherKey: 'tag_id',
  as: 'tagsFromQuestion',
});

// Un tag peut être appartenu par plusieurs questions
Tag.belongsToMany(Question, {
  through: 'question_has_tag',
  foreignKey: 'tag_id',
  otherKey: 'question_id',
  as: 'questionsFromTags',
});

module.exports = { User, Question, Tag, Comment };
