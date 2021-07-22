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
 });
 
const runBanner = () => {
	const banner_wall = chalk.bold.blueBright('\n=====================================================================================\n');
	const banner_msg = chalk.bold.blue(figlet.textSync('Employee Tracker'));
	const app_author = chalk.bold.white(`\n\n                           By: Vivianna Cowan\n`);
  	console.log(banner_wall + banner_msg + app_author + banner_wall);
}