const {test, expect} = require ('@playwright/test');

test("Clear the completed tasks from the 'All' tab", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task', {delay:200});
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

    await page.locator('.clear-completed').click();

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('.footer')).toBeHidden();

})

test("Clear the 'Fisrt' completed task from the 'All' tab", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();

    await expect(checkItem.nth(0)).toBeChecked();

    await page.locator('.clear-completed').click();

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');

})

test("Clear the completed task from the 'Completed' tab", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await checkItem.nth(0).click();

    await expect(checkItem.nth(0)).toBeChecked();

    await page.locator('a[href="#/completed"]').click();

    await expect(page.locator('.todo-list')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

    await page.locator('.clear-completed').click();

    await expect(page.locator('.todo-list')).toBeHidden();

})