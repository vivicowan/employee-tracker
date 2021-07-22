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
	const banner_wall = chalk.bold.blueBright('\n=====================================================================================\n');
	const banner_msg = chalk.bold.blue(figlet.textSync('Employee Tracker'));
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
		'View all departments',
		'View all Roles',
		'View all employees',
		new inquirer.Separator(
			"|-----------------Adding-----------------------|"
		),
		'Add department',
		'Add Roles',
		'Add Employees',
		new inquirer.Separator(
			"|-----------------Deleting---------------------|"
		),
		'Delete Departments',
		'Delete Employee',
		'Delete Roles',
		new inquirer.Separator(
			"|-----------------Updating---------------------|"
		),
		'Update Employee Roles',
		'Update employee manager',
		'View Employee By Manager',
		new inquirer.Separator(
			"|-----------------Exiting----------------------|"
		),
		'Exit',
	  ],
	})
	.then((answer) => {
		switch (answer.option) {
			case "View all departments":
				//  viewAllDepartments();
				break;
			case "View all Roles":
				//  viewAllRoles();
				break;
			case "View all employees":
				//  viewAllEmployees();
				break;
			case "Add department":
				//  addDepartment();
				break;
			case "Add Roles":
				//  addRoles();
				break;
			case "Add Employees":
				//  addEmployee();
				break;
			case "Update Employee Roles":
				//  updateEmployeeRole();
				break;
			case "Delete Departments":
				//  deleteDepartment();
				break;
			case "Delete Employee":
				//  deleteEmployee();
				break;
			case "Delete Roles":
				//  deleteRole();
				break;
			case "Update employee manager":
				//  updateManager()
				break;
			case "View Employee By Manager":
				//  viewEmployeeByManager()
				break;
			default:
				connection.end();
				console.log('Have a nice day');
				break;
	   }
	});

};