SELECT *
FROM employees
JOIN roles ON employees.role_id = roles.id;

SELECT *
FROM roles
JOIN department ON roles.department_id = department.id;