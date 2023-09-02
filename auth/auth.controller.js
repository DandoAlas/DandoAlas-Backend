const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser)
    .then((user) => {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: expiresIn
      });
      const dataUser = {
        name: user.name,
        email: user.email,
        accessToken: accessToken,
        expiresIn: expiresIn
      };
      res.send({ dataUser });
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(409).send('Email already exists');
      } else {
        res.status(500).send('Server error');
      }
    });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({ email: userData.email })
    .then((user) => {
      if (!user) {
        return res.status(409).send({ message: 'Email not found' });
      }

      const resultPassword = bcrypt.compareSync(userData.password, user.password);

      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: expiresIn
        });

        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        };
        res.send({ dataUser });
      } else {
        res.status(409).send({ message: 'Incorrect password' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Server error');
    });
};