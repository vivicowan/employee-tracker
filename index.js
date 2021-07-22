const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "employee_trackerDB",
 });
 
 connection.connect((err) => {
	if (err) throw err;
	runBanner();
	runOptions();
 });
 
const runBanner = () => {
	const banner_wall = chalk.bold.blueBright("\n=====================================================================================\n");
	const banner_msg = chalk.bold.blue(figlet.textSync("Employee Tracker"));
	const app_author = chalk.bold.white(`\n\n                           By: Vivianna Cowan\n`);
  	console.log(banner_wall + banner_msg + app_author + banner_wall);
};

const runOptions = () => {
	inquirer
	.prompt({
	  name: "option",
	  type: "list",
	  message: "What would you like to do?",
	  choices: [
		new inquirer.Separator(
			"|-----------------Viewing----------------------|"
		),
		"View all Departments",
		"View all Roles",
		"View all Employees",
		"View Employee By Manager",
		"View Employee By Department",
		new inquirer.Separator(
			"|-----------------Adding-----------------------|"
		),
		"Add Department",
		"Add Roles",
		"Add Employees",
		new inquirer.Separator(
			"|-----------------Deleting---------------------|"
		),
		"Delete Department",
		"Delete Roles",
		"Delete Employee",
		new inquirer.Separator(
			"|-----------------Updating---------------------|"
		),
		"Update Employee Department",
		"Update Employee Roles",
		"Update Employee Manager",
		new inquirer.Separator(
			"|-----------------Exiting----------------------|"
		),
		"Exit",
	  ],
	})
	.then((answer) => {
		switch (answer.option) {
			case "View all Departments":
				 viewDepartments();
				break;
			case "View all Roles":
				 viewRoles();
				break;
			case "View all Employees":
				//  viewEmployees();
				break;
			case "View Employee By Manager":
				//  viewEmployeeByManager()
				break;
			case "View Employee By Department":
				//  viewEmployeeByDepartment()
				break;
			case "Add Department":
				//  addDepartment();
				break;
			case "Add Roles":
				//  addRole();
				break;
			case "Add Employees":
				//  addEmployee();
				break;
			case "Update Employee Department":
				//  updateDepartment()
				break;
			case "Update Employee Roles":
				//  updateRole();
				break;
			case "Update Employee Manager":
				//  updateManager()
				break;
			case "Delete Department":
				//  deleteDepartment();
				break;
			case "Delete Roles":
				//  deleteRole();
				break;
			case "Delete Employee":
				//  deleteEmployee();
				break;
			default:
				connection.end();
				console.log("Have a nice day");
				break;
	   }
	});

};

const viewDepartments = () => {
	connection.query(
		"SELECT * FROM department", (err, res) => {
			if (err) throw err;
			console.table(res)
			runOptions();
		}
  )
};

const viewRoles = () => {
	connection.query(
		"SELECT * FROM role", (err, res) => {
			if (err) throw err;
			console.table(res)
			runOptions();
		}
  )
}