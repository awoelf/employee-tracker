const cTable = require('console.table');

const department = {
    handleViewDept: () => {
        fetch('http://localhost:3001/api/department', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('\n');
            console.table(data.data);
        })
        .catch((error) => console.error(error))
    },
    handleAddDept: () => {

    }
}

module.exports = department;