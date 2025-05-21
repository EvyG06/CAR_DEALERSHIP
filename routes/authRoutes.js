const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs'); 

console.log('User model:', User);
console.log('Bcrypt module loaded successfully:', bcrypt);

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Received registration data:', { name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: name, email, password' });
    }

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
    console.error('Detailed registration error:', error);
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ error: 'Error de validación', details: validationErrors });
    }
    res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login data:', { email, password });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas: usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas: contraseña incorrecta' });
    }

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Detailed login error:', error);
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
});

module.exports = router;