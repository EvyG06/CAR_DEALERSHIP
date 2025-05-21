const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController');
const authService = require('../services/authService');

router.post('/', authService, SalesController.createSale);
router.get('/', authService, SalesController.getAllSales); 
router.get('/:id', authService, SalesController.getSaleById);
router.put('/:id', authService, SalesController.updateSale);
router.delete('/:id', authService, SalesController.deleteSale);

module.exports = router;