const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');
const authService = require('../services/authService');

router.post('/', authService, SupplierController.createSupplier);
router.get('/', authService, SupplierController.getAllSuppliers);
router.get('/:id', authService, SupplierController.getSupplierById);
router.put('/:id', authService, SupplierController.updateSupplier);
router.delete('/:id', authService, SupplierController.deleteSupplier);

module.exports = router;