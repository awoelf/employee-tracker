const inquirer = require('inquirer');
const department = require('./department');
const role = require('./role');
const employee = require('./employee');

const ansiEscapes = require('ansi-escapes');

const menu = () => {
    try {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Welcome to the Employee Tracker. Please choose an option:',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ],
                name: 'choice',
            }
        ])
        .then((data) => {
            console.log(data.choice);
            switch (data.choice) {
                case 'View all departments':
                    department.handleViewDept();
                    break;
                case 'View all roles':
                    role.handleViewRole();
                    break;
                case 'View all employees':
                    employee.handleViewEmp();
                    break;
                case 'Add a department':
                    department.handleAddDept();
                    break;
                case 'Add a role':
                    role.handleAddRole();
                    break;
                case 'Add an employee':
                    employee.handleAddEmp();
                    break;          
            }
        })
        .then(() => {
            menu();
        })
    } catch {
        return('Menu error');
    }
};


module.exports = menu;