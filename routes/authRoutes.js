const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'capa8' && password === '123456') {
    res.json({
      success: true,
      user: { username: 'admin', name: 'El admin ;)' },
      token: 'real-token-admin'
    });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

module.exports = router;
