const { Sales, Customers, Vehicle } = require('../models');

exports.createSale = async (req, res) => {
  try {
    const sale = await Sales.create(req.body);
    res.status(201).json(sale);
    }catch (error) {
        res.status(500).json({ error: 'Error creando la venta' });
    }
  };

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.findAll({
      include: [
        { model: Customers, as: 'customer' },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo las ventas' });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id, {
      include: [
        { model: Customers, as: 'customer' },
        { model: Vehicle, as: 'vehicle' }
      ]
    });
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la venta' });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    await sale.update(req.body);
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la venta' });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    await sale.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando la venta' });
  }
};


