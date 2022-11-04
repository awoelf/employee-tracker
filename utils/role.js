const role = {
    handleViewRole: () => {
        fetch('http://localhost:3001/api/role', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('\n \n');
            console.table(data.data)
            console.log('\n \n');
        })
        .catch((error) => console.error(error))
    },
    handleAddRole: () => {

    }
}

module.exports = role;