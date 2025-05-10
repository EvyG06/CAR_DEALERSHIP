const { Customer, Sale } = require('../models');

exports.createCustomer = async (req, res) => {
  try {
    const { Nombre, Email, Telefono, Dirección, Preferencias, Seguimiento, ÚltimoSeguimiento} = req.body;


    if (!Nombre || !Email || !Telefono|| !Dirección) {
      return res.status(400).json({ error: 'Nombre, Email, Telefono, y dirección son requeridos' });
    }

    const customer = await Customer.create({
      Nombre,
      Email,
      Telefono,
      Dirección,
      Preferencias,
      Seguimiento,
      ÚltimoSeguimiento,	
    });

    res.status(201).json(customer);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email debe ser único' });
    }
    res.status(400).json({ error: 'No se pudo crear el cliente' });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Sale,
          as: 'Sales',
          include: ['Vehicle'], 
        },
      ],
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los clientes" });

    
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Sale,
          as: 'Sales',
          include: ['Vehicle'],
        },
      ],
    });
    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const{ Nombre, Email, Telefono, Dirección, Preferencias, Seguimiento, ÚltimoSeguimiento} = req.body;
    await customer.update({
        Nombre,
        Email,
        Telefono,
        Dirección,
        Preferencias,
        Seguimiento,
        ÚltimoSeguimiento,	
    });

    res.status(200).json(customer);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El email debe ser único' });
    }
    res.status(400).json({ error: 'Error actualizando el cliente' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'CLiente no encontrado' });
    }

    await customer.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar el cliente' });
  }
};