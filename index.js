const inquirer = require("inquirer")
const db = require("./db");

function init(){
    console.log("Welcome to your employee management system!")
    mainMenu()
}

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Employees", "View All Roles", "Update Employee Role", "Add Department", "Add Employee", "Add Role"]
        }
    ])
    .then(response =>{
        console.log("hit userChoice")
        let userChoice = response.choice;
        if(userChoice === "View All Departments"){
            viewAllDepartments()
        }

    })

}

function viewAllDepartments(){
    console.log("hit viewAllDepartments")
    db.findAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        console.table(departments)
    })
    .then(()=> mainMenu())
}

init()