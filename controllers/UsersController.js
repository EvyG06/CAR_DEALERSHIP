const { User } = require('../models');
  const jwt = require('jsonwebtoken');
  require('dotenv').config();

  const userController = {
    async register(req, res) {
      try {
        console.log('Datos recibidos:', req.body); 
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        console.log('Usuario creado:', user.toJSON()); 
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ id: user.id, name, email, role, token });
      } catch (error) {
        console.error('Error en register:', error); 
        res.status(400).json({ error: error.message });
      }
    },

    async login(req, res) {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validPassword(password))) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ id: user.id, name: user.name, email, role: user.role, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  module.exports = userController;