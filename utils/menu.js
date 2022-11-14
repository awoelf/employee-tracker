const fetch = require("node-fetch");
const term = require('terminal-kit').terminal;
const cTable = require('console.table');
const nanoid = require("nanoid");
const { response } = require("express");


const choices = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Quit'
];

const menuOptions = {
    y: 2,
};

const menu = (message = 'Please choose an option below:') => {
    term.clear().moveTo(1, 1);
    term.green(message);
    term.singleColumnMenu(choices, menuOptions, (err, res) => { 
        switch (res.selectedIndex) {
            // View all departments
            case 0:  
                handleViewDept();
                break;
            // View all roles
            case 1:
                handleViewRole();
                break;
            // View all employees
            case 2:
                handleViewEmp();
                break;
            // Add a department
            case 3:
                handleAddDept();
                break;
            // Add a role
            case 4:
                handleAddRole();
                break;
            // Add an employee
            case 5:
                handleViewDept();
                break;
            // Update an employee role
            case 6:
                handleViewDept();
                break;
            // Quit
            case 7:
                term.clear(); 
                process.exit(0)
        }        
    })
}

const handleViewDept = () => {
    fetch('http://localhost:3001/api/department', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const table = cTable.getTable(data.data)
        term.moveTo(2, 10).green(table);

    })
    .then(menu())
    .catch((error) => console.error(error))
}

const handleAddDept = async () => {
    term('What is the name of the department?').eraseDisplayBelow();
    term.inputField((err, deptName) => {
        if (err) {
            console.error(err);
        }
        
        fetch('http://localhost:3001/api/department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: deptName, id: nanoid(4)})
        })
        .then((res) => res.json())
        .then(menu())
        .catch((err) => console.error(err))
    })
}

const getAllDepts = async () => {
    const response = await fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();
    let nameList = []
    data.data.forEach(item => {
        nameList.push(item.name);
    });
    return(nameList);
}



const handleViewRole = () => {
    fetch('http://localhost:3001/api/role', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const table = cTable.getTable(data.data)
        term.moveTo(2, 10).green(table);

    })
    .then(menu())
    .catch((error) => console.error(error))
}

const handleAddRole = async () => {
    term('What is the name of the role?');
    const roleName = await term.inputField().promise;
    term.eraseLine().moveTo(1, 10);
    term('What is the salary of the role?');
    const salary = await term.inputField().promise;
    term.eraseLine().moveTo(1, 10);
    term('Which department is the role in?');
    const department = term.singleColumnMenu(await getAllDepts(), (err, res) => {
        return getId(res.selectedText);
    });

    
}



const handleViewEmp = () => {
    fetch('http://localhost:3001/api/employee', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const table = cTable.getTable(data.data)
        term.moveTo(2, 10).green(table);

    })
    .then(menu())
    .catch((error) => console.error(error))
}

const handleAddEmp = () => {

}

const getId = async (name) => {
    const reponse = await fetch(`http://localhost:3001/api/department/${name}`, {
        method: 'GET',
    })
    const data = await response.json();
    return data.data[0].id;
}


module.exports = menu;