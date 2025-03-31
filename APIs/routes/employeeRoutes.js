const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');
const authService = require('../services/authService');

router.get('/', authService, EmployeeController.getAllEmployees);
router.get('/:id', authService, EmployeeController.getEmployeeById);    
router.post('/', authService, EmployeeController.createEmployee);
router.put('/:id', authService, EmployeeController.updateEmployee);
router.delete('/:id', authService, EmployeeController.deleteEmployee);
router.get('/:id', authService, EmployeeController.getEmployeeMaintenance);