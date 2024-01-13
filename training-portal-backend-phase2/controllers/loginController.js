const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    //compare the provided password with the hashed password

    // comparing DB password with req.body password
    const isMatch = await bcrypt.compare(password, user.password);

    // checking for comparison
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    //If password is valid, proceed...

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        //id: user.id,
        role: user.role,
      },
      'secret123',
      { expiresIn: '6h' },
    );
    res.set('x-auth', token);
    res.status(200).json({ status: 'ok', user: token, role: user.role });
  } else {
    res.status(404).json({ status: 'false', message: 'user not found' });
  }
};

module.exports = loginController;
