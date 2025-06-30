# Playwright Automation - TodoMVC

This personal learning project consists of automated test cases for the public web application [TodoMVC](http://todomvc.com/), using Playwright and JavaScript.

It includes both end-to-end flows and functional test cases focused on specific features such as task creation, editing, filtering, and deletion.

The goal was to practise modern automation tools, apply best practices in test structure, and simulate real user interactions in a realistic UI.

---

## 🛠️ Technologies 

- [Playwright](https://playwright.dev/)
- JavaScript
- Node.js
- Git
- GitHub Actions, HTML Reporter

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
