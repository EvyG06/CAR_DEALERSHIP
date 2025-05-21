const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Received registration data:', { name, email, password }); 

 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

 
    const user = await User.create({ name, email, password });

    console.log('User registered with ID:', user.id);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: { id: user.id, name: user.name, email: user.email }, 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});

module.exports = router;
