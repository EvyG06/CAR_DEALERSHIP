require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const customerRoutes = require('./routes/CustomersRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const saleRoutes = require('./routes/salesRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/vehicles', vehicleRoutes);
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orders', orderRoutes);
app.use('/sales', saleRoutes);
app.use('/employees', employeeRoutes);
app.use('/maintenances', maintenanceRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Car Dealership API está corriendo!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
