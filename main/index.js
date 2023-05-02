const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Bandersnatch',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
                        err ? console.error(err) : console.table(results)
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
                    });
                    break;
                case 'Add Role': 
                    addRole();
                    break;
                case 'View All Departments': 
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                    });
                    break;
                case 'Add Department': 
                    addDepartment();
                    break;
                case 'Quit': 

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
                    message: 'Who is the manager of the new employee?'
                },
            ])
            .then((answer) => {
                db.query(`INSERT answer.newEmployeeFirstName, answer.newEmployeeLastName, answer.newEmployeeRole, answer.newEmployeeManager INTO employees.first_name, employees.last_name, employees.role_id, employees.manager`, (err, results) => {
                    if(err) {
                        console.error(err)
                    }
                    else {
                        console.log('Employee added!')
                    }
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
                    db.query(`INSERT answer.newRoleName, answer.newRoleSalary, answer.newRoleDepartment INTO roles.title, roles.salary, roles.department_id`, (err, results) => {
                        if (err) {
                            console.error(err)
                        }
                        else {
                            console.log('Role added!')
                        }
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
                    db.query(`INSERT answer.newDepartmentName INTO department.name`, (err, results) => {
                        if (err) {
                            console.error(err)
                        }
                        else {
                            console.log('Department added successfully');
                        }
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
                        err ? console.error(err) : console.log('Role updated!')
                    })
                })
        }
    })
}