const employee = {
    handleViewEmp: () => {
        fetch('http://localhost:3001/api/employee', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => console.table(data.data))
        .catch((error) => console.error(error))
    },
    handleAddEmp: () => {

    }
}

module.exports = employee;