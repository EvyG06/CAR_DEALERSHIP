const {Maintenance, Employee, Vehicles } = require('../models');


exports.createMaintenance = async (req, res) => {
    try {
        const { vehicleId, TipoDeMantenimiento, descripción} = req.body;{
        
            if(!vehicleId || !TipoDeMantenimiento || !descripción) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
            if (!['preventivo', 'correctivo'].includes(TipoDeMantenimiento)) {
                return res.status(400).json({ error: 'TipoDeMantenimiento debe ser "preventivo" or "correctivo"' })

            }
            const maintenance = await Maintenance.create({ vehicleId, TipoDeMantenimiento, descripción });
            res.status(201).json(maintenance);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error creando el mantenimiento' });
    }   
}
exports.getAllMaintenances = async (req, res) => {
    try {
        const maintenances = await Maintenance.findAll({
            include: [
                { model: Vehicles, as: 'vehicle' },
                { model: Employee, as: 'employee' }
            ]
        });
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los mantenimientos' });
    }
};  

exports.getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id, {
            include: [
                { model: Vehicles, as: 'vehicle' },
                { model: Employee, as: 'employee' }
            ]
        });
        if (!maintenance) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el mantenimiento' });
    }
};
exports.updateMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }
        await maintenance.update(req.body);
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el mantenimiento' });
    }
};
exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }
        await maintenance.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el mantenimiento' });
    }
};
exports.getMaintenanceByVehicleId = async (req, res) => {
    try {
        const maintenances = await Maintenance.findAll({
            where: { vehicleId: req.params.id },
            include: [
                { model: Vehicles, as: 'vehicle' },
                { model: Employee, as: 'employee' }
            ]
        });
        if (!maintenances) {
            return res.status(404).json({ error: 'Mantenimientos no encontrados' });
        }
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los mantenimientos por vehículo' });
    }
};

exports.getMaintenanceByEmployeeId = async (req, res) => {
    try {
        const maintenances = await Maintenance.findAll({
            where: { employeeId: req.params.id },
            include: [
                { model: Vehicles, as: 'vehicle' },
                { model: Employee, as: 'employee' }
            ]
        });
        if (!maintenances) {
            return res.status(404).json({ error: 'Mantenimientos no encontrados' });
        }
        res.status(200).json(maintenances);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los mantenimientos por empleado' });
    }
};
