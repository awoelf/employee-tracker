const inquirer = require('inquirer');
const department = require('./department');
const role = require('./role');
const employee = require('./employee');

const menu = {
    main: () => {
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
                    ],
                    name: 'choice',
                }
            ]).then((data) => {
                console.log(data.choice);
                switch (data.choice) {
                    case 'View all departments':
                        department.handleViewDepts();
                        break;
                        
                }

            })
            return('Main menu success');
        } catch {
            return('Main menu error');
        }
        
    }
};

module.exports = menu;