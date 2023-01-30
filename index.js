const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const TEAM = [];

const questions = {
    menu: [{
        type: 'list',
        name: 'role',
        message: 'What type of team member do you want to add?',
        choices: [
            'Add an engineer',
            'Add an intern',
            'Finish building the team',
        ]
    }],
    manager: [
        {
            type: 'input',
            name: 'name',
            message: "What is your manager's name?",
            validate: function (input){
                return required(input, 'Name')
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your manager's employee ID?",
            validate: function (input){
                return required(input, 'ID')
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your manager's email address?",
            validate: function (input){
                // add an email validation function
                return required(input, 'Email address');
            }
        },
        {
            type: 'input',
            name: 'office_number',
            message: "What is your manager's office number?",
            validate: function (input){
                return required(input, 'Office number')
            }
        }
    ],
    engineer: [
        {
            type: 'input',
            name: 'name',
            message: "What is your manager's name?",
            validate: function (input){
                return required(input, 'Name')
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your manager's employee ID?",
            validate: function (input){
                return required(input, 'ID')
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your manager's email address?",
            validate: function (input){
                // add an email validation function
                return required(input, 'Email address');
            }
        },
        {
            type: 'input',
            name: 'office_number',
            message: "What is your manager's office number?",
            validate: function (input){
                return required(input, 'Office number')
            }
        }
    ]
}

const menu = [{
    type: 'list',
    name: 'role',
    message: 'What type of team member do you want to add?',
    choices: [
        'Add an engineer',
        'Add an intern',
        'Finish building the team',
    ]
}]

const role_specific_questions = {
    manager: {
        type: 'input',
        name: 'office_number',
        message: "What is your manager's office number?",
        validate: function (input){
            return required(input, 'Office number')
        }
    },
    engineer: {
        type: 'input',
        name: 'github',
        message: "What is your engineer's GitHub username?",
        validate: function (input){
            return required(input, 'GitHub username')
        }
    },
    intern: {
        type: 'input',
        name: 'office_number',
        message: "What is your intern's school name?",
        validate: function (input){
            return required(input, 'School name')
        }
    }
}

function employeeQuestions(role){
    return [
        {
            type: 'input',
            name: 'name',
            message: `What is your ${role}'s name?`,
            validate: function (input){
                return required(input, 'Name')
            }
        },
        {
            type: 'input',
            name: 'id',
            message: `What is your ${role}'s employee ID?`,
            validate: function (input){
                return required(input, 'ID')
            }
        },
        {
            type: 'input',
            name: 'email',
            message: `What is your ${role}'s email address?`,
            validate: function (input){
                // add an email validation function
                return required(input, 'Email address');
            }
        },
    ]
}


// TODO: Write Code to gather information about the development team members, and render the HTML file.

async function init(){
    console.log('init')
    await managerPrompt()
    await menuPrompt();
    console.log("End")
}

async function menuPrompt(){
    let choice = '';
    while (choice.role!='Finish building the team'){
        choice = await inquirer.prompt(menu)
        switch (choice.role){
            case 'Add an engineer':
                console.log('choice', choice.role);
                await engineerPrompt();
                break;
            case 'Add an intern':
                console.log('choice', choice.role);
                await internPrompt();
                break;
            case 'Finish building the team':
                console.log('choice', choice.role);
                console.log('Team built');
                break;
        }
    }
}

async function managerPrompt(){
    let questions = employeeQuestions('manager');
    questions.push(role_specific_questions.manager);
    let manager = await inquirer.prompt(questions);
    TEAM.push(new Manager(manager.name, manager.id, manager.email, manager.office_number))
}

async function engineerPrompt(){
    let questions = employeeQuestions('engineer');
    questions.push(role_specific_questions.engineer);
    let engineer = await inquirer.prompt(questions);
    TEAM.push(new Engineer(engineer.name, engineer.id, engineer.email, engineer.github))
}

async function internPrompt(){
    let questions = employeeQuestions('intern');
    questions.push(role_specific_questions.intern);
    let intern = await inquirer.prompt(questions);
    TEAM.push(new Intern(intern.name, intern.id, intern.email, intern.school));
}

function required(input, field){
    if (input == ''){
        return `${field} required`
    }
    return true
}

init();
