const inquirer = require('inquirer');
const fs = require('fs');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const menuList = () => {
    inquirer
        .prompt([
            {
                name: 'viewList',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
            }
        ])
        .then((answer) => {
            switch(answer.viewList) {
                case 'View All Employees': 
                    db.query(`SELECT * FROM employees`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        menuList();
                    });
                    break;
                case 'Add Employee': 
                    addEmployee();
                    break;
                case 'Update Employee Role': 
                    updateEmployee();
                    break;
                case 'View All Roles': 
                    db.query(`SELECT * FROM roles`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        menuList();
                    });
                    break;
                case 'Add Role': 
                    addRole();
                    break;
                case 'View All Departments': 
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        menuList();
                    });
                    break;
                case 'Add Department': 
                    addDepartment();
                    break;
                case 'Quit': 
                    db.end();
            }
        })
}

const addEmployee = () => {

    inquirer.prompt([
                {
                    name: 'newEmployeeFirstName',
                    type: 'input',
                    message: 'What is the first name of the new employee?'
                },
                {
                    name: 'newEmployeeLastName',
                    type: 'input',
                    message: 'What is the last name of the new employee?'
                },
                {
                    name: 'newEmployeeRole',
                    type: 'input',
                    message: 'What is the role of the new employee?',
                    default: 'Input a number.'
                },
                {
                    name: 'newEmployeeManager',
                    type: 'input',
                    message: 'What is the manager id of the new employee?'
                },
            ])
            .then((answer) => {
                db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${answer.newEmployeeFirstName}', '${answer.newEmployeeLastName}', ${answer.newEmployeeRole}, ${answer.newEmployeeManager})`, (err, results) => {
                    if(err) {
                        console.error(err)
                    }
                    else {
                        console.log('Employee added!');
                    }
                    menuList();
                })
            })

        }

const addRole = () => {

            inquirer
                .prompt([
                    {
                        name: 'newRoleName',
                        type: 'input',
                        message: 'What is the new role?'
                    },
                    {
                        name: 'newRoleSalary',
                        type: 'input',
                        message: 'What is the new role salary?'
                    },
                    {
                        name: 'newRoleDepartment',
                        type: 'input',
                        message: 'What is the department id for the new role?'
                    }
                ])
                .then((answer) => {
                    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ('${answer.newRoleName}', ${answer.newRoleSalary}, ${answer.newRoleDepartment})`, (err, results) => {
                        if (err) {
                            console.error(err)
                        }
                        else {
                            console.log('Role added!')
                        }
                        menuList();
                    })
                })
}


const addDepartment = () => {
            inquirer
                .prompt([
                    {
                        name: 'newDepartmentName',
                        type: 'input',
                        message: 'What is the new department?'
                    }
                ])
                .then((answer) => {
                    db.query(`INSERT INTO department(name) VALUES ('${answer.newDepartmentName}')`, (err, results) => {
                        if (err) {
                            console.error(err)
                        }
                        else {
                            console.log('Department added successfully');
                        }
                        menuList();
                    })
                })

            }

const updateEmployee = () => {
    const employeeArr = [];
    db.query(`SELECT id FROM employees`, (err, results) => {
        if(err) {
            console.error(err)
        }
        else {
            for (let i=0; i< results.length; i++) {
                employeeArr.push(results[i].id);
            }
            inquirer    
                .prompt([
                    {
                        name: 'selectingEmployeeID',
                        type: 'list',
                        message: 'What is the employee id?',
                        choices: employeeArr
                    },
                    {
                        name: 'updateRole',
                        type: 'input',
                        message: 'What is the new role id?',
                        default: 'Input a role id number'
                    }
                ])
                .then((answer) => {
                    db.query(`UPDATE employees SET role_id = ${answer.updateRole} WHERE employees.id = ${answer.selectingEmployeeID}`, (err, results) => {
                        err ? console.error(err) : console.log('Role updated!');
                        menuList();
                    })
                })
        }
    })
}

menuList();