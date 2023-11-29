const { Comment } = require('../models');
const { Question } = require('../models');

const CommentController = {
  async postComment(req, res) {
    try {
      const questionId = req.params.id;
      const question = await Question.findByPk(questionId, {
        include: [
          { association: 'commentsFromQuestion', include: 'userOfComment' },
          { association: 'tagsFromQuestion' },
        ],
      });
      const texteAvecSautsDeLigne = question.description.replace(/\n/g, '<br>');
      if (!req.session.username) {
        const errorMessage =
          '*Vous devez être connecté pour pouvoir poster un commentaire';
        return res.render('question.ejs', {
          errorMessage,
          question,
          texteAvecSautsDeLigne,
        });
      }

      let comment = req.body.commentDescription;

      if (comment === '') {
        const errorMessage = '*Vous ne pouvez pas poster un commentaire vide';
        return res.render('question.ejs', {
          errorMessage,
          question,
          texteAvecSautsDeLigne,
        });
      }

      const newComment = await Comment.create({
        description: comment,
        user_id: res.locals.userID,
        question_id: req.params.id,
      });

      return res.redirect(`/question/${req.params.id}`);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },
  async updateComment(req, res) {
    try {
      const commentId = Number(req.params.id);

      const foundComment = await Comment.findByPk(commentId);

      // Gestion des erreurs
      if (!foundComment) {
        return res.status(404).json({
          error: "Commentaire non trouvé. Merci de vérifier l'id renseigné.",
        });
      }

      if (
        typeof req.body.description !== 'undefined' &&
        typeof req.body.description !== 'string'
      ) {
        return res.status(400).json({
          error:
            "Invalid body parameter 'description'. Should provide a string.",
        });
      }

      // Préparation des données à mettre à jour avec les données reçues
      const commentNewData = {};

      if (req.body.description) {
        commentNewData.description = req.body.description;
      }

      await foundComment.update(commentNewData);

      return res.json(foundComment);
    } catch (error) {
      console.trace(error);
      return res
        .status(500)
        .json({ error: 'Unexpected server error. Please try again later.' });
    }
  },
  async deleteComment(req, res) {
    try {
      const commentId = Number(req.params.id);

      const comment = await Comment.findByPk(commentId);

      if (!comment) {
        return res
          .status(404)
          .json({ error: "Commentaire non trouvé. Merci de vérifier l'id." });
      }

      if (comment.user_id !== req.session.userID) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à supprimer ce commentaire",
        });
      }

      await comment.destroy();

      return res.sendStatus(204);
    } catch (error) {
      console.trace(error);
      return res
        .status(500)
        .json({ error: 'Unexpected server error. Please try again later.' });
    }
  },
};

module.exports = CommentController;
