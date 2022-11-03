const express = require('express');


const departmentRouter = require('./api/department');
const employeeRouter = require('./api/employee');
const roleRouter = require('./api/role');

const app = express();

app.use('/department', departmentRouter);
app.use('/employee', employeeRouter);
app.use('/role', roleRouter);

module.exports = app;