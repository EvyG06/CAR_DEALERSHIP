const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const authService = require('../services/authService');

router.get('/', authService, OrderController.getAllOrders);
router.get('/:id', authService, OrderController.getOrderById);
router.post('/', authService, OrderController.createOrder);
router.put('/:id', authService, OrderController.updateOrder);
router.delete('/:id', authService, OrderController.deleteOrder);
router.get('/customer/:id', authService, OrderController.getOrdersByCustomerId);



