const {test, expect} = require ('@playwright/test')

// Investigate how to add multiple tasks all at once or how to do it more clear
test("Sort by 'Active' tasks, all incompleted", async ({page}) => {

    const newTask = page.locator('.new-todo');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    //await page.waitForTimeout(3000);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

})

test("Sort by 'Active' tasks, 'First' and 'Third' task are completed", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Third task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Fourth task',{delay:100});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(4);

    await expect(page.locator('.todo-count')).toContainText('4'); 

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(2).click();

    await expect(page.locator('.todo-list li')).toHaveCount(4);

    await expect(page.locator('.todo-count')).toContainText('2');   

    //await page.waitForTimeout(3000);

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');    

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

})

test("Sort by 'Active' tasks, all completed", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:100});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');  

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(1).click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');    

    //await page.waitForTimeout(3000);

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('0');
    
    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

})

//This could be a manual test case only
test("Sort by 'Active' tasks and go back to 'All'tab, all tasks remain shown", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:100});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(1).click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    //await page.waitForTimeout(3000);

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('0');   
    
    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    await page.locator('a[href="#/"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');    

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

})


test("Sort by 'Completed' tasks, all incompleted", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('a[href="#/completed"]').click();

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('2');   

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

})

test("Sort by 'Completed' tasks, second task completed", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(1).click();
    await expect(checkItem.nth(1)).toBeChecked();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('1');   

    await page.locator('a[href="#/completed"]').click();

    await expect(checkItem.nth(0)).toBeChecked();
    
    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');  

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

})

test("Sort by 'Completed' tasks, all completed", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(1).click();

    await expect(checkItem.nth(0)).toBeChecked();
    await expect(checkItem.nth(1)).toBeChecked();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');   

    await page.locator('a[href="#/completed"]').click();

    await expect(checkItem.nth(0)).toBeChecked();
    await expect(checkItem.nth(1)).toBeChecked();
    
    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

})
//This could be a manual test case only
test("Sort by 'Completed' tasks and go back to 'All' tab, all tasks remain shown", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:100});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:100});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(1).click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    //await page.waitForTimeout(3000);

    await page.locator('a[href="#/completed"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');   
    
    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

    await page.locator('a[href="#/"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');    

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

})