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
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

app.get('/', (req, res) => {
    res.json(200);
})

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

app.get('/api/departments', (req, res) => {
    db.query('SELECT name FROM department', (err, rows) => {
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

app.get('/api/department/:name', (req, res) => {
    if (req.params.name) {
        db.query(`SELECT id FROM department WHERE name='${req.params.name}'`, (err, rows) => {
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
    }

    
})

app.post('/api/department', (req, res) => {
    const {name, id} = req.body;
    const sql = `INSERT INTO department (id, name) VALUES ('${id}', '${name}')`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body,
        })
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
    // console.log(`App listening at http://localhost:${PORT}`)
})

menu('Welcome to the Employee Tracker! Please choose an option below:');