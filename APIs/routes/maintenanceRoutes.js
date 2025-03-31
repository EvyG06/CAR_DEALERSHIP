const express = require('express');
const router = express.Router();
const MaintenanceController = require('../controllers/MaintenanceController');
const authService = require('../services/authService');


router.get('/', authService, MaintenanceController.getAllMaintenanceRecords);
router.get('/:id', authService, MaintenanceController.getMaintenanceRecordById);
router.post('/', authService, MaintenanceController.createMaintenanceRecord);
router.put('/:id', authService, MaintenanceController.updateMaintenanceRecord);
router.delete('/:id', authService, MaintenanceController.deleteMaintenanceRecord);
router.get('/vehicle/:id', authService, MaintenanceController.getMaintenanceByVehicleId);
router.get('/employee/:id', authService, MaintenanceController.getMaintenanceByEmployeeId);