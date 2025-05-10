const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/VehicleController');
const authService = require('../services/authService');



router.get('/', authService, VehicleController.getAllVehicles);
router.get('/:id', authService, VehicleController.getVehicleById);
router.post('/', authService, VehicleController.createVehicle);
router.put('/:id', authService, VehicleController.updateVehicle);
router.delete('/:id', authService, VehicleController.deleteVehicle);

module.exports = router;