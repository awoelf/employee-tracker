const express = require('express');
const mysql = require('mysql2');
const menu = require('./utils/menu');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

app.get('/api/department', (req, res) => {
    const sql = `SELECT id, name FROM department`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
        return rows;
    })
})

app.get('/api/employee', (req, res) => {
    const sql = `SELECT id, first_name, last_name, role_id, manager_id FROM employee`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
        return rows;
    })
})

app.get('/api/role', (req, res) => {
    const sql = `SELECT id, title, salary, department_id FROM role`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'Success',
            data: rows
        });
        return rows;
    })
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

menu()