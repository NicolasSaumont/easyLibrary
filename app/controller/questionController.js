const { Question } = require('../models');

const questionController = {
  async getQuestions(req, res) {
    try {
      const questions = await Question.findAll({
        include: [{ association: 'tagsFromQuestion' }],
      });

      return res.status(201).render('questions.ejs', { questions });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async getQuestionById(req, res) {
    try {
      const questionId = parseInt(req.params.id, 10);

      const question = await Question.findByPk(questionId, {
        include: [
          { association: 'commentsFromQuestion', include: 'userOfComment' },
          { association: 'tagsFromQuestion' },
        ],
      });

      if (!question) {
        return res.status(404).json({
          message: 'Question not found. Please verify the provided id',
        });
      }

      const texteAvecSautsDeLigne = question.description.replace(/\n/g, '<br>');

      const errorMessage = '';

      return res.status(201).render('question.ejs', {
        question,
        texteAvecSautsDeLigne,
        errorMessage,
      });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = questionController;
