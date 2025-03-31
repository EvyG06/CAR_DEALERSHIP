const { Vehicle } = require('../models');

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
    }catch (error) {
    res.status(500).json({ error: 'Error al encontrar vehiculos' });
    }
}
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error al encontrar vehiculo' });
  }
};
exports.createVehicle = async (req, res) => {
  try {
    const { Marca, Modelo, Año, características, Estado } = req.body;
    const newVehicle = await Vehicle.create({ Marca, Modelo, Año, características, Estado });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear vehiculo' });
  }
};
exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { Marca, Modelo, Año, características, Estado } = req.body;
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }
    const { Marca, Modelo, Año, características, Estado } = req.body;
    await vehicle.update({ Marca, Modelo, Año, características, Estado });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar vehiculo' });
  }
};
exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }
    await vehicle.destroy();
    res.status(204).json({ message: 'Vehiculo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar vehiculo' });
  }
};
