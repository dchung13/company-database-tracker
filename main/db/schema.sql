DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    --links department_id with department id--
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    --links department_name with department name--
    FOREING KEY (department_name)
    REFERENCES department(department_name)
    ON DELETE SET NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id INT NOT NULL,
    role_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    manager VARCHAR(30),
    --links role_id with roles id--
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    --links department_name with department name--
    FOREIGN KEY (department_name)
    REFERENCES department(department_name)
    ON DELETE SET NULL,
    --links salary with roles table--
    FOREIGN KEY (salary)
    REFERENCES roles(salary)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);
