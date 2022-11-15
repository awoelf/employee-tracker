INSERT INTO department (id, name)
VALUES  (1234, "Finance"),
        (5678, "HR");

INSERT INTO role (id, name, salary, department_id)
VALUES  (898, "Accountant", 50000.00, 1234);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (3424, "Alexis", "Woelffer", 898, 393);