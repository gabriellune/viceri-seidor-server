const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create(name, email, hashedPassword, (err, userId) => {
    if (err) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(201).json({ id: userId });
  });
};