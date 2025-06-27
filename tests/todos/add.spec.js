const {test, expect} = require ('@playwright/test');
const { text } = require('stream/consumers');

// Investigate how to add multiple tasks all at once or how to do it more clear
test("Add tasks", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const itemList = page.locator('.todo-list li');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Third task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Fourth task', {delay:200});
    await page.keyboard.press('Enter');
 
    //await page.waitForTimeout(3000);

    //await expect(page.locator('a[href="#/"]')).toBeVisible();
    
    //Myabe this validations isn't necessary if I'm checking the task were added by validating the text of each one
    expect(itemList).toHaveCount(4);
     
    const texts = await itemList.allTextContents();
    expect(texts).toEqual(['First task', 'Second task', 'Third task', 'Fourth task']);

    await expect(page.locator('#toggle-all')).toBeVisible();

    await expect(page.locator('.footer')).toBeVisible();

    // Maybe I can just validate the elements in the footer, if the footer is not visible, the elements will not be either, and instead of count the elements I can validate them by text
    const footerElements = page.locator('footer span.todo-count, footer li');  
    await expect(footerElements).toHaveCount(4);

    //Rewrite this
    await expect(page.locator('.todo-count')).toContainText('4');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');
})
 
//This could be a manual test case only
test("Add empty task, no other task is in the list", async ({page}) =>{

    //I have to add 'waitUntil' because the page wans't working properly 
    await page.goto('https://demo.playwright.dev/todomvc/#/', { waitUntil: 'domcontentloaded' });

    await page.locator('.new-todo').click();
    
    await page.keyboard.press('Enter');

    await expect(page.locator('.main')).toBeHidden();

    await expect(page.locator('.footer')).toBeHidden();
})

//This could be a manual test case only
test("Add empty task, a task is in the list already", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    await page.goto('https://demo.playwright.dev/todomvc/#/', { waitUntil: 'domcontentloaded' });

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await page.locator('.new-todo').click();
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-list')).toHaveText('First task');

    await expect(page.locator('#toggle-all')).toBeVisible();

    await expect(page.locator('.footer')).toBeVisible();

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');
})


test("Add a task from the 'Active' tab, a task is in the list already", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    await page.goto('https://demo.playwright.dev/todomvc/#/', { waitUntil: 'domcontentloaded' });

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

})

test("Add a task from the 'Completed' tab, a task is in the list already", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    await page.goto('https://demo.playwright.dev/todomvc/#/', { waitUntil: 'domcontentloaded' });

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('a[href="#/completed"]').click();

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('2');

})



