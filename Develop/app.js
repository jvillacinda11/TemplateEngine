const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

let employees = []


const main = function () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      choices: ['Create Intern', 'Create Engineer', 'Create Manager', 'See All', 'Render']
    }
  ])
    .then(res => {
      switch (res.choice) {
        case 'Create Intern':
          createIntern()
          break;
        case 'Create Engineer':
          createEngineer()
          break;
        case 'Create Manager':
          createManager()
          break;
          case 'See All':
          seeAll()
          break;
        case 'Render':
          rend()
          break;
      }
    })
    .catch(err => { console.log(err) })
}

const createIntern = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter ID number"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email"
    },
    {
      type: 'input',
      name: 'school',
      message: 'Enter school name'
    }
  ])
    .then(respo => {

      employees.push(new Intern(respo.name, respo.id, respo.email, respo.school))

      main()
    })
    .catch(err => { console.log(err) })
}

const createEngineer = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter ID number"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email"
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter Github username'
    }
  ])
    .then(respon => {
      employees.push(new Engineer(respon.name, respon.id, respon.email, respon.github))
      main()
    })
    .catch(err => { console.log(err) })
}
const createManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter ID number"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter email"
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Enter Office Number'
    }
  ])
    .then(respons => {
      employees.push(new Manager(respons.name, respons.id, respons.email, respons.officeNumber))
      main()
    })
}
seeAll = ()=>{
  console.log(employees)
  main()
}
const rend = ()=>{
fs.writeFile(outputPath, render(employees), err => {
  if (err) { console.error(err) }
  else{
    console.log('Success! Rendered in output folder.')
  }
})
}
main()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```