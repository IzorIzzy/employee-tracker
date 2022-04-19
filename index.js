const inquirer = require("inquirer");
const db = require("./db");

function init() {
  console.log("Welcome to your employee management system!");
  mainMenu();
}

function mainMenu() {
    console.log("getting to mainMenu()")
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Employees",
          "View all Roles",
          "Update Employee Role",
          "Add Department",
          "Add Employee",
          "Add Role",
        ],
      },
    ])
    .then((answers) => {
        let userChoice = answers.choice;
        console.log("userChoice", userChoice)
      if (userChoice === "View all Departments") {
        viewAllDepartments();
      } else if (userChoice === "View all Employees"){
          viewAllEmployees()
      } else if (userChoice === "View all Roles"){
          viewAllRoles()
      } else if (userChoice === "Add Department"){
          addDepartment()
      } else if (userChoice === "Add Role"){
        addRole()
      } else if (userChoice === "Add Employee"){
        addEmployee()
      } else {
          // updateEmpRole()
      }
    });
}

function viewAllDepartments() {
  console.log("hit viewAllDepartments");
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => mainMenu());
}


function viewAllEmployees() {
    console.log("hit viewAllEmployee");
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.table(employees);
      })
      .then(() => mainMenu());
  }

  function viewAllRoles() {
    console.log("hit viewAllRoles");
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.table(roles);
      })
      .then(() => mainMenu());
  }

  function addDepartment(){
      inquirer.prompt([
          {
              name: "name",
              message: "What is the name of the department you want to add?"
          }
      ])
      .then(response =>{
          let department = response;
          db.createDepartment(department)
          .then(()=> console.log(`You added ${department.name} to the database!`))
          .then(() => mainMenu());
      })
  }

  function addRole(){
      db.findAllDepartments()
      .then(([rows])=>{
          let departments = rows;
          const departmentChoices = departments.map(({id, name})=>({
              name: name,
              value: id
          }))

          inquirer.prompt([
              {
                  name: "title",
                  message: "What is the title of the role?"
              },
              {
                name: "salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What department will this role fit under?",
                choices: departmentChoices
            },
          ])
          .then(role =>{
              db.createRole(role)
              .then(()=> console.log(`You added ${role.title} to the database!`))
          .then(() => mainMenu());
          })
      })

  }

  function addEmployee(){
      inquirer.prompt([
          {
              name: "first_name",
              message: "What is the employee's first name?"
          },
          {
              name: "last_name",
              message: "What is the employee's last name?"
          }
      ])
      .then(response => {
          let firstName = response.first_name;
          let lastName = response.last_name;

          db.findAllRoles()
          .then(([rows])=>{
              let roles = rows;
              const roleChoices = roles.map(({ id, title})=>
              ({
                  name: title,
                  value: id
              }))

              inquirer.prompt({
                  type: "list",
                  name: "role_id",
                  message: "What is this employee's role?",
                  choices: roleChoices
              })
              .then(response =>{
                  let roleId = response.role_id
                 let employee = {
                     role_id: roleId,
                     first_name: firstName,
                     last_name: lastName
                 }
                  db.createEmployee(employee)
                  .then(()=> console.log(`You added ${employee.first_name} ${employee.last_name} to the database!`))
                  .then(()=> mainMenu())
              })
          })
      })
  }

 

init();
