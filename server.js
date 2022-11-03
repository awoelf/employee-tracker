const express = require('express');
const mysql = require('mysql2');
const api = require('./routes/index');
const menu = require('./utils/menu');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api)

export const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'xortonryla!',
        database: 'employees_db'
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

app.get('/', (req, res) => {
    res.json(menu.main());
})

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})