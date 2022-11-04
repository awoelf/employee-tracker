const inquirer = require('inquirer');
const department = require('./department');
const role = require('./role');
const employee = require('./employee');
const ansiEscapes = require('ansi-escapes');

const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Quit'
]

const initMessage = `
╔═══╗        ╔╗                      ╔════╗            ╔╗         
║╔══╝        ║║                      ║╔╗╔╗║            ║║         
║╚══╗╔╗╔╗╔══╗║║ ╔══╗╔╗ ╔╗╔══╗╔══╗    ╚╝║║╚╝╔═╗╔══╗ ╔══╗║║╔╗╔══╗╔═╗
║╔══╝║╚╝║║╔╗║║║ ║╔╗║║║ ║║║╔╗║║╔╗║      ║║  ║╔╝╚ ╗║ ║╔═╝║╚╝╝║╔╗║║╔╝
║╚══╗║║║║║╚╝║║╚╗║╚╝║║╚═╝║║║═╣║║═╣     ╔╝╚╗ ║║ ║╚╝╚╗║╚═╗║╔╗╗║║═╣║║ 
╚═══╝╚╩╩╝║╔═╝╚═╝╚══╝╚═╗╔╝╚══╝╚══╝     ╚══╝ ╚╝ ╚═══╝╚══╝╚╝╚╝╚══╝╚╝ 
         ║║         ╔═╝║                                          
         ╚╝         ╚══╝                                          
Please choose an option below:`

const menu = (message = initMessage) => {
    try {
        process.removeAllListeners('warning')
        process.stdout.write(ansiEscapes.clearTerminal);
        inquirer.prompt([
            {
                type: 'list',
                message: `${message}`,
                choices: choices,
                name: 'selection',
            }
        ])
        .then((data) => {

            switch (data.selection) {
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
                case 'Quit':
                    process.exit(0);
                    break;       
            }
        })
        .then(() => {
            anotherOption();
        })
    } catch {
        return('Menu error');
    }
};

const anotherOption = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to choose another option?',
            name: 'selection',
        }
    ])
    .then((data) => {
        data.selection ? menu('Please choose an option') : process.exit(0);
    })
}

module.exports = menu;