const { Supplier } = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el proveedor' });
    }
    }
    exports.getSuppliers = async (req, res) => {    
        try {
            const suppliers = await Supplier.findAll();
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo los proveedores' });
        }
    }
    exports.getSupplierById = async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            if (!supplier) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ error: 'Error obteniendo el proveedor' });
        }
    }
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await supplier.update(req.body);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando el proveedor' });
    }
}
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        await supplier.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el proveedor' });
    }
}
