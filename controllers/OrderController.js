const { Order, Vehicle, Customer } = require('../models'); 

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creando la orden' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Supplier, as: 'supplier' },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las ordenes' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: Supplier, as: 'supplier' },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la orden' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la orden' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la orden' });
  }
};

exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    const orders = await Order.findAll({
      where: { customerId: customerId },
      include: [
        { model: Supplier, as: 'supplier' },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ordenes para este cliente' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las ordenes del cliente' });
  }
};
