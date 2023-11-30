const { Book } = require('../models');

const bookController = {
  async getAllBooksFromUser(req, res) {
    try {
      const userId = res.locals.userId;

      const user = await User.findByPk(userId, {
        include: [{ 
          association: 'booksFromUser', 
          include: 'authorOfBook',
          include: 'tagOfBook',
          include: 'statusOfBook',
        }],
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: 'User not found. Please verify the provided id' });
      }

      return res.status(201).json(user);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async getOneBook(req, res) {
    try {
      const bookId = parseInt(req.params.bookId, 10);

      const book = await Book.findByPk(bookId, {
        include: [
          { association: 'authorOfBook' },
          { association: 'tagOfBook' },
          { association: 'statusOfBook' },
        ],
      });

      if (!book) {
        return res.status(404).json({
          message: 'Book not found. Please verify the provided id',
        });
      }

      return res.status(201).json(book);
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async postOneBook(req, res) {
    try {
      const {
        title, description, starting_date, ending_date, pages, grade, author_id, status_id, tag_id
      } = req.body;

      const newBook = await Book.create({
        title: title,
        description: description,
        starting_date: starting_date,
        ending_date: ending_date,
        pages: pages,
        grade: grade,
        author_id: author_id,
        status_id: status_id,
        tag_id: tag_id,
        user_id: res.locals.userId,
      });

      return res.status(201).json({ message: 'Livre créé' });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async editOneBook(req, res) {
    try {
      const bookId = parseInt(req.params.bookId, 10);

      const foundBook = await Book.findByPk(bookId);

      // Gestion des erreurs
      if (!foundBook) {
        return res.status(404).json({
          error: "Livre non trouvé. Merci de vérifier l'id renseigné.",
        });
      }

      // Préparation des données à mettre à jour avec les données reçues
      const bookNewData = {};

      if (req.body.title) {
        bookNewData.title = req.body.title;
      }

      if (req.body.description) {
        bookNewData.description = req.body.description;
      }

      if (req.body.starting_date) {
        bookNewData.starting_date = req.body.starting_date;
      }

      if (req.body.ending_date) {
        bookNewData.ending_date = req.body.ending_date;
      }

      if (req.body.pages) {
        bookNewData.pages = req.body.pages;
      }

      if (req.body.grade) {
        bookNewData.grade = req.body.grade;
      }

      if (req.body.author_id) {
        bookNewData.author_id = req.body.author_id;
      }

      if (req.body.status_id) {
        bookNewData.status_id = req.body.status_id;
      }

      if (req.body.tag_id) {
        bookNewData.tag_id = req.body.tag_id;
      }

      await foundBook.update(bookNewData);

      return res.status(201).json(foundBook);
    } catch (error) {
      console.trace(error);
      return res
        .status(500)
        .json({ error: 'Unexpected server error. Please try again later.' });
    }
  },

  async deleteOneBook(req, res) {
    try {
      const bookId = parseInt(req.params.bookId, 10);

      const book = await Book.findByPk(bookId);

      if (!book) {
        return res
          .status(404)
          .json({ error: "Livre non trouvé. Merci de vérifier l'id." });
      }

      if (book.user_id !== req.session.userID) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à supprimer ce livre",
        });
      }

      await book.destroy();

      return res.sendStatus(204);
    } catch (error) {
      console.trace(error);
      return res
        .status(500)
        .json({ error: 'Unexpected server error. Please try again later.' });
    }
  },
};

module.exports = bookController;
