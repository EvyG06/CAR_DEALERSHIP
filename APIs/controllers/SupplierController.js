const { Supplier } = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Error creando el proveedor' });
    }
    }