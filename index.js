const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

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

function init(){

}

function managerPrompt(){}

function engineerPrompt(){}

function internPrompt(){}

function required(input, field){
    if (input == ''){
        return `${field} required`
    }
    return true
}