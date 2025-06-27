const {test, expect} = require ('@playwright/test');

test("Add, complete, and delete a task", async ({page}) => {

    const newTask = page.locator('.new-todo');

    const itemList = page.locator('.todo-list li');

    const checkItem = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task', {delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Third task', {delay:200});
    await page.keyboard.press('Enter');

    const textsBefore = await itemList.allTextContents();
    expect(textsBefore).toEqual(['First task', 'Second task', 'Third task']);

    await expect(page.locator('.todo-count')).toContainText('3');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(1).click();

    expect(checkItem.nth(1)).toBeChecked();

    expect(itemList.nth(1)).toHaveClass('completed');

    await expect(itemList).toHaveCount(3)

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('.clear-completed')).toBeVisible();

    //await page.waitForTimeout(1000);

    await page.locator('a[href="#/active"]').click();

    const textsAfter = await itemList.allTextContents();
    expect(textsAfter).toEqual(['First task', 'Third task']);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    //await page.waitForTimeout(1000);

    await page.locator('a[href="#/completed"]').click();

    await expect(page.locator('.todo-list')).toHaveText('Second task');

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

    await page.locator('.clear-completed').click();

    await expect(page.locator('.todo-list')).toBeHidden();
    
    await expect(page.locator('.footer')).toBeVisible();

    await page.reload();

    await expect(page.locator('.todo-list')).toBeHidden();
    
    await expect(page.locator('.footer')).toBeVisible();

    //await page.waitForTimeout(1000);

    await page.locator('a[href="#/active"]').click();

    const textsActive = await itemList.allTextContents();
    expect(textsActive).toEqual(['First task', 'Third task']);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    //await page.waitForTimeout(1000);

    await page.locator('a[href="#/"]').click();

    const textsAll = await itemList.allTextContents();
    expect(textsAll).toEqual(['First task', 'Third task']);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

})