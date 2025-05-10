const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/CustomersController');
const authService = require('../services/authService');


router.get('/', authService, CustomersController.getAllCustomers);
router.get('/:id', authService, CustomersController.getCustomerById);
router.post('/', authService, CustomersController.createCustomer);
router.put('/:id', authService, CustomersController.updateCustomer);
router.delete('/:id', authService, CustomersController.deleteCustomer);



module.exports = router;