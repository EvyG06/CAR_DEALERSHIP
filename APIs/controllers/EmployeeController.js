const {employees, vehicles, Maintenance} = require('../models');

const { name, role, contactInfo, hireDate } = req.body;

exports.createEmployee = async (req, res) => {
    try {
    if (!['Vendedor', 'Manager', 'Mecánico'].includes(role)) {
      return res.status(400).json({ error: 'El rol debe ser "Vendedor", "Manager", or "Mecánico"' });
    }
    const employee = await Employee.create({ name, rol, comisiones, tareas });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Error creando el empleado' });
  }
};
exports.getAllEmployees = async (req, res) => {
    try {
        const employeesList = await employees.findAll();
        res.status(200).json(employeesList);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los empleados' });
    }
};
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employees.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el empleado' });
    }
};
exports.updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Emppleado no encontrado' });
      }
      const { role } = req.body;
      if (role && !['salesperson', 'manager', 'mechanic'].includes(role)) {
        return res.status(400).json({ error: 'El rol debe ser "Ventas", "Manager", o "Mecánico"' });
      }
      await employee.update(req.body);
      res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ error: 'Error actualizando el empleado' });
     
    }
  };
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await employees.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        await employee.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el empleado' });
    }
};
exports.getEmployeeMaintenance = async (req, res) => {
    try {
        const employee = await employees.findByPk(req.params.id, {
            include: maintenance
        });
        if (!employee) {
            return res.status(404).json({ error: 'Mecánico no encontrado' });
        }
        res.status(200).json(employee.vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo mecánicos asignados' });
    }
};