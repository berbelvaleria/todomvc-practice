# Playwright Automation - TodoMVC

Automation scripts for the web application [TodoMVC](http://todomvc.com/) using Playwright and JavaScript.

This project includes full end-to-end user workflow scripts, as well as functional test cases focused on specific sections of the application, such as task creation, editing, filtering, and deletion.

The test cases emulate real user interactions to validate behavior, element states, and overall user experience in a modern web application.

---

## 🛠️ Technologies 

- [Playwright](https://playwright.dev/)
- JavaScript
- Node.js
- Git
- GitHub Actions, Allure, HTML Reporter

---

## 📁 Project structure

```
todomvc
├── node_modules/
├── playwright-report/
├── screenshots/
├── test-results/
├── tests/todos/
│ ├── add.spec.js
│ ├── clear.spec.js
│ ├── complete.spec.js
│ ├── delete.spec.js
│ ├── e2e.spec.js
│ ├── edit.spec.js
│ └── filters.spec.js
├── .gitignore
├── playwright.config.js
├── package.json
└── README.md
```

## 🚀 How to install and run the project

```
1. Clone the repository:

git clone git@github.com:berbelvaleria/todomvc-practice.git
cd todomvc-practice

2. Install dependencies 
npm install  

3. Install Playwright (if not already installed) 
npx playwright install

4. Execute all the tests  
npx playwright test

5. View the HTML report 
npx playwright show-report
```


## ✅ Automated test cases

- Create/Add a new task
- Clear a task
- Complete a task
- Delete a task
- End-to-end workflow (Create, complete, delete)
- Edit a task
- Filter tasks



## 🖼️ Report example

[Playwright report HTML](https://github.com/berbelvaleria/todomvc-practice/blob/main/screenshots/report-v2.png) 



## 👨‍💻 Learning

This project was created as part of my transition from Manual QA to QA Automation, focusing on good practices, test structure, and modern testing tools like Playwright. 
