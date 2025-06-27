const {test, expect} = require ('@playwright/test')


test("Delete the only task in the list from the 'All' tab", async ({page}) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTask = page.locator('.new-todo');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await page.locator('.todo-list li').first().hover();

    await page.locator('.destroy').first().click();

    //await page.waitForTimeout(2000);

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('#toggle-all')).toBeHidden();

})

test("Delete the 'Second' task from the 'All' tab", async ({page}) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTask = page.locator('.new-todo');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2)

    await expect(page.locator('.todo-count')).toContainText('2');

    await page.locator('.todo-list li').nth(1).hover();

    await page.locator('.destroy').nth(1).click();

    //await page.waitForTimeout(2000);

    await expect(page.locator('.todo-list li')).toHaveCount(1)

    await expect(page.locator('.todo-count')).toContainText('1');

})

test("Delete the only task in the list from the 'Active' tab", async ({page}) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const newTask = page.locator('.new-todo');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    await page.locator('.todo-list li').first().hover();

    await page.locator('.destroy').first().click();

    //await page.waitForTimeout(2000);

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('#toggle-all')).toBeHidden();

})