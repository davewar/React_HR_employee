-- CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS employees (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email TEXT NOT NULL,
    gender VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL
    );

-- psql = test 
INSERT INTO employees ( name, email, gender, status) values ('name', 'email@gmail.com', 'male', 'inactive');

-- UPDATE employees SET name = 'dw', email = 'dw@gmail.com', gender = 'female', status = 'active' where id = 1 returning *;

SELECT * FROM employees;

-- DROP TABLE IF EXISTS employees;
-- DROP DATABASE IF EXISTS test;

