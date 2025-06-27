const {test, expect} = require ('@playwright/test')


    test("Edit task, change the title", async ({page})=> {

        const newTask = page.locator('.new-todo');

        await page.goto('https://demo.playwright.dev/todomvc/#/');

        await newTask.type('First task', {delay:200});
        await page.keyboard.press('Enter');

        await expect(page.locator('.todo-list')).toContainText('First');

        await expect(page.locator('.todo-list')).toHaveCount(1)

        await expect(page.locator('.todo-count')).toContainText('1');

        const taskLabel = page.locator('.todo-list li').nth(0).locator('label');
        await taskLabel.dblclick();

        const editInput = page.locator('.todo-list li.editing .edit');
        await editInput.press('Meta+A', {delay:200});
        await editInput.type('New task', {delay:200});
        await editInput.press('Enter');
        
        await expect(page.locator('.todo-list')).toContainText('New');

        await expect(page.locator('.todo-list')).toHaveCount(1)

        await expect(page.locator('.todo-count')).toContainText('1');

    })

    //Manual case
    test("Edit task, leave it empty", async ({page})=> {

        const newTask = page.locator('.new-todo');

        await page.goto('https://demo.playwright.dev/todomvc/#/');

        await newTask.type('First task', {delay:200});
        await page.keyboard.press('Enter');

        const taskLabel = page.locator('.todo-list li').nth(0).locator('label');
        await taskLabel.dblclick();

        const editInput = page.locator('.todo-list li.editing .edit');
        await page.keyboard.press('Meta+A', {delay:200});   
        await page.keyboard.press('Backspace', {delay:200});       
        await page.keyboard.press('Enter');

        await expect(page.locator('.main')).toBeHidden();

        await expect(page.locator('.footer')).toBeHidden();
    })


    test("Edit 'Second' task, change the title from the 'Active' tab", async ({page})=> {

        const newTask = page.locator('.new-todo');

        const itemList = page.locator('.todo-list li');

        await page.goto('https://demo.playwright.dev/todomvc/#/');

        await newTask.type('First task', {delay:200});
        await page.keyboard.press('Enter');

        await newTask.type('Second task', {delay:200});
        await page.keyboard.press('Enter');

        await page.locator('a[href="#/active"]').click();

        const textsBefore = await itemList.allTextContents();
        expect(textsBefore).toEqual(['First task', 'Second task']);

        await expect(itemList).toHaveCount(2)

        await expect(page.locator('.todo-count')).toContainText('2');

        await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

        const taskLabel = itemList.nth(1).locator('label');
        await taskLabel.dblclick();
  
        const editInput = page.locator('.todo-list li.editing .edit');
        await editInput.press('Meta+A', {delay:200});
        await editInput.type('New task', {delay:200});
        await editInput.press('Enter');
        
        const textsAfter = await itemList.allTextContents();
        expect(textsAfter).toEqual(['First task', 'New task']);

        await expect(itemList).toHaveCount(2)

        await expect(page.locator('.todo-count')).toContainText('2');

    })

    test("Edit task, change the title from the 'Completed' tab", async ({page})=> {

        const newTask = page.locator('.new-todo');

        const itemList = page.locator('.todo-list li');

        const checkItem = page.locator('.toggle');

        await page.goto('https://demo.playwright.dev/todomvc/#/');

        await newTask.type('First task', {delay:200});
        await page.keyboard.press('Enter');

        await checkItem.nth(0).click();

        await expect(checkItem.nth(0)).toBeChecked();

        await page.locator('a[href="#/completed"]').click();

        await expect(page.locator('.todo-list')).toContainText('First');

        await expect(itemList).toHaveCount(1)

        await expect(page.locator('.todo-count')).toContainText('0');

        await expect(page.locator('a[href="#/completed"]')).toHaveClass('selected');

        const taskLabel = itemList.nth(0).locator('label');
        await taskLabel.dblclick();
  
        const editInput = page.locator('.todo-list li.editing .edit');
        await editInput.press('Meta+A', {delay:200});
        await editInput.type('New task', {delay:200});
        await editInput.press('Enter');
        
        await expect(page.locator('.todo-list')).toContainText('New');

        expect(itemList).toHaveCount(1)

        await expect(page.locator('.todo-count')).toContainText('0');

    })