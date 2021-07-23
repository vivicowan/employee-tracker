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
  const banner_wall = chalk.bold.blueBright(
    "\n=====================================================================================\n"
  );
  const banner_msg = chalk.bold.blue(figlet.textSync("Employee Tracker"));
  const app_author = chalk.bold.white(
    `\n\n                           By: Vivianna Cowan\n`
  );
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
          viewEmployees();
          break;
        case "View Employee By Manager":
           viewEmployeeByManager()
          break;
        case "View Employee By Department":
           viewEmployeeByDepartment()
          break;
        case "Add Department":
           addDepartment();
          break;
        case "Add Roles":
           addRole();
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
  connection.query("SELECT d.id 'Department ID', d.name 'Department' FROM department d",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runOptions();
    }
  );
};

const viewRoles = () => {
  connection.query("SELECT r.title 'Title', r.salary 'Salary', d.name 'Department' FROM roles r INNER JOIN department d ON r.department_id = d.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    runOptions();
  });
};

const viewEmployees = () => {
  connection.query("SELECT e.id 'Employee ID', CONCAT(e.first_name,' ',e.last_name ) 'Employee Name', r.title 'Job Title', r.salary 'Salary', d.name 'Department', CONCAT(e2.first_name,' ',e2.last_name) 'Manager' FROM employee e INNER JOIN roles r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee e2 ON e2.id = e.manager_id", (err, res) => {
    if (err) throw err;
    console.table(res);
    runOptions();
  });
};

const viewEmployeeByManager = () => {
	inquirer
    .prompt([
      {
        name: "byManager",
        type: "input",
        message: "Please input the manager ID to find an employee by their manager.",
      }
    ])
    .then( (answers) => {
      const byManager = answers.byManager;
		connection.query("SELECT e.id 'Employee ID', CONCAT(e.first_name,' ',e.last_name ) 'Employee Name', d.name 'Department', r.title 'Job Title' FROM employee e LEFT JOIN roles r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id WHERE manager_id = ?", byManager, (err, res) => {
      	if (err) throw err;
			console.table(res);
      	runOptions();
      });
	});
}

const viewEmployeeByDepartment = () => {
	inquirer
    .prompt([
      {
        name: "byDepartment",
        type: "input",
        message: "Please input the department ID to find an employee by their department.",
      }
    ])
    .then( (answers) => {
      const byDepartment = answers.byDepartment;
		connection.query("SELECT e.id 'Employee ID', CONCAT(e.first_name,' ',e.last_name ) 'Employee Name', r.title 'Job Title', d.name 'Department' FROM employee e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id WHERE d.id = ?", byDepartment, (err, res) => {
      	if (err) throw err;
			console.table(res);
      	runOptions();
      });
	});
}


const addDepartment = () => {
	inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department you would like to add?",
      }
    ])
    .then( (answers) => {
      const department = answers.department;
		connection.query("INSERT INTO department SET name = ?", department, (err, res) => {
      	if (err) throw err;
			console.log(`
##############################
	Department Added
##############################
	      `);
      	runOptions();
      });
	});
}

const addRole = () => {
	connection.query("SELECT * FROM department", (err, res) => {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to bid on
		const departments = res.map((dept) => { 
			return {name: dept.name, value: dept.id}
		});
		inquirer
			.prompt([
				{
               type: 'input',
               name: 'roles',
               message: 'Please add a role:'
            },
			   {
               type: 'input',
               name: 'salary',
               message: 'Please enter a salary:'
            },
            {
               type: 'list',
               name: 'depts',
               choices: departments,
               message: 'Please select your department.'
            }
         ])
			.then( (answers) => {
				const role = { 
					title: answers.roles, 
					salary: answers.salary, 
					department_id: answers.depts};
				connection.query("INSERT INTO roles SET ?", role, (err, res) => {
					if (err) throw err;
					console.log(`
##############################
	Role Added	
##############################
					`);
					runOptions();
				});			
			});
      })
}

    