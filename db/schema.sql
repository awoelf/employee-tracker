DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

use employees_db;

CREATE TABLE department (
    id VARCHAR(4) PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id VARCHAR(4) PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id VARCHAR(4),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(4),
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT
)