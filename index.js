const generateHTML = require('./src/generateHTML');

const Manager  = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern   = require('./lib/Intern'); 
const fs       = require('fs'); 
const inquirer = require('inquirer');

const teamArray = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Team Manager:', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("enter name.");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "employee ID:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("enter ID.")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "email:",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('enter email.')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Office Number:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('enter office number.')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log('Add employee(s)');

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Employee Role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Employee Name:", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("enter employee name.");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "employee ID:",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("enter employee ID.");
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Employee Email:",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('enter email.');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "github username.",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("enter employee github username.");
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "School:",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("enter school.");
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'More Teammates?',
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Profile created. Please check index.html")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => { return generateHTML(teamArray); })
  .then(pageHTML => { return writeFile(pageHTML); })
  .catch(err => { console.log(err); })
;