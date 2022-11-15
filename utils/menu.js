const fetch = require("node-fetch");
const cTable = require('console.table');
const nanoid = require("nanoid");

// terminal-kit is used instead of inquirer because of greater functionality
// with menus and input
const term = require('terminal-kit').terminal;

// Menu choices
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

// Option that places the menu on line 2, below the message prompt
const menuOptions = {
    y: 2,
};

// main menu function
const menu = (message = 'Please choose an option below:') => {
    term.clear().moveTo(1, 1);
    term.green(message);
    term.singleColumnMenu(choices, menuOptions, async (err, res) => { 
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
                handleAddEmp();
                break;
            // Update an employee role
            case 6:
                handleEmpUpdate();
                break;
            // Quit
            case 7:
                term.clear(); 
                process.exit(0)
        }       
    })
}

// Displays all departments
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
        term.moveTo(2, 12).green(table);

    })
    .then(menu())
    .catch((error) => console.error(error))
}


// Adds a department
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

// Displays all roles
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
        term.moveTo(2, 12).green(table);
    })
    .then(menu())
    .catch((error) => console.error(error))
}

// Adds a new role
const handleAddRole = async () => {
    term.moveTo(1, 12).eraseDisplayBelow();
    term('What is the name of the role?');
    const roleName = await term.inputField().promise;

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('What is the salary of the role?');
    const salary = await term.inputField().promise;

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('Which department is the role in?');
    // Gets a list of all departments to use as menu choices
    const department = await term.singleColumnMenu(await getAllItems('department')).promise;
    // Gets the id of the selected department
    const id = await getId('department', await department.selectedText);

    fetch('http://localhost:3001/api/role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: roleName, 
            id: nanoid(4), // nanoid creates a 4 character id
            salary: salary,
            department_id: id
        })
    })
    .then((res) => res.json())
    .then(menu())    
    .catch((err) => console.error(err))
}

// View all employees
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
        term.moveTo(2, 12).green(table);

    })
    .then(menu())
    .catch((error) => console.error(error))
}

// Add a new employee
const handleAddEmp = async () => {
    term.moveTo(1, 12).eraseDisplayBelow();
    term('What is the employee\'s first name?');
    const firstName = await term.inputField().promise;

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('What is the employee\'s last name?');
    const lastName = await term.inputField().promise;

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('Which role is the employee in?');
    // Gets a list of all roles to use as menu choices
    const role = await term.singleColumnMenu(await getAllItems('role')).promise;
    // Gets the id associated with the role
    const id = await getId('role', await role.selectedText);

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('What is their manager\'s id?');
    const managerId = await term.inputField().promise;

    fetch('http://localhost:3001/api/employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: nanoid(4),
            first_name: firstName,
            last_name: lastName,
            role_id: id,
            manager_id: managerId
        })
    })
    .then((res) => res.json())
    .then(menu())
    .catch((err) => console.error(err))
}

// Update the role of the employee
const handleEmpUpdate = async () => {
    term.moveTo(1, 12).eraseDisplayBelow();
    term('What is the employee\'s name?');
    // Gets a list of names of all employees
    const name = await term.singleColumnMenu(await getEmpNames()).promise;
    // Gets the id associated with the employee
    const empId = await getEmpId(await name.selectedText.replace(/ /g,"_"))

    term.eraseLine().moveTo(1, 12).eraseDisplayBelow();
    term('What is the employee\'s new role?');
    const role = await term.singleColumnMenu(await getAllItems('role')).promise;
    const roleId = await getId('role', await role.selectedText);

    fetch('http://localhost:3001/api/employee', {
        method: 'PUT', // Put method because updating existing data
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            role_id: roleId,
            id: empId
        })
    })
    .then((res) => res.json())
    .then(menu())
    .catch((err) => console.error(err))
}

// Gets the id from a given table and name
const getId = async (table, name) => {
    const response = await fetch(`http://localhost:3001/api/${table}/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    const id = await data.data[0].id;
    return id;
}

// Gets all entries from a table
const getAllItems = async (table) => {
    const response = await fetch(`http://localhost:3001/api/${table}`, {
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

// Gets all employee names
const getEmpNames = async () => {
    const response = await fetch(`http://localhost:3001/api/employee`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();
    let nameList = []
    data.data.forEach(item => {
        // Each list entry consists of the employee's first and last name
        nameList.push(item.first_name + ' ' + item.last_name);
    });
    return(nameList);
}

// Gets id of employee name
const getEmpId = async (empName) => {
    const response = await fetch(`http://localhost:3001/api/employee/${empName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json();
    id = data.data[0].id;
    return id;
}

module.exports = menu;