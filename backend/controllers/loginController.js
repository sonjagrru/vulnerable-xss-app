const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService.authenticate(email, password);
    console.log('User found:', user);
    if (user) {
      res.json({ success: true, user: { id: user.id, email: user.email } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { login };