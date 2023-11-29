const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Question } = require('../models');
const { User } = require('../models');
const { Tag } = require('../models');

const mainController = {
  // Randomize an array using Fisher-Yates method
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  async homePage(req, res) {
    try {
      const questions = await Question.findAll({
        include: [{ association: 'tagsFromQuestion' }],
      });

      const questionsAlreadyShown = new Set();

      const uniqueQuestions = [];

      const shuffledQuestions = mainController.shuffleArray(questions);

      for (const question of shuffledQuestions) {
        if (!questionsAlreadyShown.has(question)) {
          questionsAlreadyShown.add(question);
          uniqueQuestions.push(question);
        }

        if (uniqueQuestions.length >= 3) {
          break;
        }
      }

      const tags = await Tag.findAll({
        order: [['name', 'ASC']],
      });

      return res.status(201).render('index.ejs', { uniqueQuestions, tags });
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async loginPage(req, res) {
    try {
      if (!res.locals.user) {
        const errorMessage = '';

        return res.render('login.ejs', { errorMessage });
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async postLogin(req, res) {
    try {
      const userEmail = req.body.email;
      const userPassword = req.body.password;

      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      if ((userEmail === '') | (userPassword == '')) {
        const errorMessage = '*Merci de renseigner tous les champs';
        return res.render('login.ejs', { errorMessage });
      }

      if (!user) {
        const errorMessage = '*Utilisateur non trouvé';
        return res.render('login.ejs', { errorMessage });
      }

      const passwordMatch = await bcrypt.compare(userPassword, user.password);

      if (!passwordMatch) {
        const errorMessage = '*Mot de passe incorrect';
        return res.render('login.ejs', { errorMessage });
      } else {
        req.session.userID = user.dataValues.id;
        req.session.userMail = user.dataValues.email;
        req.session.username = user.dataValues.username;
        res.redirect('/');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async logout(req, res) {
    try {
      req.session.destroy(res.redirect('/'));
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },

  async signupPage(req, res) {
    try {
      const errorMessage = '';

      return res.render('signup.ejs', { errorMessage });
    } catch (error) {
      console.trace(error);
    }
  },

  async postSignup(req, res) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      if (!username || !email || !password) {
        const errorMessage = '*Tous les champs doivent être remplis';
        return res.render('signup.ejs', { errorMessage });
      }

      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (existingUser) {
        const errorMessage = "*L'utilisateur existe déjà";
        return res.render('signup.ejs', { errorMessage });
      }

      if (emailValidator.validate(req.body.email) !== true) {
        const errorMessage = "*Format de l'email invalide";
        return res.render('signup.ejs', { errorMessage });
      }

      if (req.body.password !== req.body.passwordConfirm) {
        const errorMessage = '*Les mots de passe doivent être identiques';
        return res.render('signup.ejs', { errorMessage });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email: email,
        password: hashedPassword,
        username: username,
      });

      // Connexion
      req.session.userID = newUser.dataValues.id;
      req.session.userMail = newUser.dataValues.email;
      req.session.username = newUser.dataValues.username;
      res.redirect('/');
    } catch (error) {
      console.trace(error);
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = mainController;
