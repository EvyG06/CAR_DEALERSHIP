require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const customerRoutes = require('./routes/CustomersRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const orderRoutes = require('./routes/orderRoutes');
const saleRoutes = require('./routes/salesRoutes');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require("./routes/usersRoutes");


db.sequelize.sync();

const app = express();

// Middlewares

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

app.use('/vehicles', vehicleRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/sales', saleRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);

app.get("/", (req, res) => {
    res.send("Car Dealership API está corriendo!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
});

module.exports = app;