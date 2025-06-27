const {test, expect} = require ('@playwright/test')

//Validate task go back to active using both down arrow and toggle (maybe in another file)
//Unselect task

test("Complete First task from the 'All' tab using the simple 'Toggle'", async ({page}) =>{

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
    //Investigate if I can validate that .todo-list has one item completed
    await expect(checkItem.nth(0)).toBeChecked();

    await expect(page.locator('.todo-list li').nth(0)).toHaveClass('completed');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('.clear-completed')).toBeVisible();

})

//This could be a manual test case only 
test("Complete 'First' and 'Third' task from the 'All' tab using the simple 'Toggle'", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const checkItem = page.locator('.toggle');
    

    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Third task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(3);

    await expect(page.locator('.todo-count')).toContainText('3');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await checkItem.nth(0).click();
    await checkItem.nth(2).click();

    await expect(checkItem.nth(0)).toBeChecked();
    await expect(checkItem.nth(2)).toBeChecked();

    await expect(page.locator('.todo-list li').nth(0)).toHaveClass('completed');
    await expect(page.locator('.todo-list li').nth(2)).toHaveClass('completed');

    await expect(page.locator('.todo-list li')).toHaveCount(3);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('.clear-completed')).toBeVisible();

})


test("Complete all tasks from the 'All' tab using the simple 'Toggle'", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const itemList = page.locator('.todo-list li');

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

    //await page.waitForTimeout(1000);

    //Investigate if I can validate that .todo-list has all items completed
    await expect(checkItem.nth(0)).toBeChecked();
    await expect(checkItem.nth(1)).toBeChecked();

    expect(itemList.nth(0)).toHaveClass('completed');
    expect(itemList.nth(1)).toHaveClass('completed');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('.clear-completed')).toBeVisible();
})


test("Complete all tasks from the 'All' tab using the multiple 'Toggle'", async ({page}) =>{

    const newTask = page.locator('.new-todo');

    const ItemChecked = page.locator('.toggle');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('#toggle-all').click();

    //await page.waitForTimeout(1000);

    //Investigate if I can validate that .todo-list has all items completed
    await expect(ItemChecked.nth(0)).toBeChecked();
    await expect(ItemChecked.nth(1)).toBeChecked();

    await expect(page.locator('.todo-list li').nth(0)).toHaveClass('completed');
    await expect(page.locator('.todo-list li').nth(1)).toHaveClass('completed');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('.clear-completed')).toBeVisible();
})


test("Complete 'First' task from the 'Active' tab using the simple 'Toggle'", async ({page}) =>{

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

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    await checkItem.nth(0).click();

    await expect(page.locator('.todo-count')).not.toContainText('First Task');

    await expect(page.locator('.todo-list li')).toHaveCount(1);

    await expect(page.locator('.todo-count')).toContainText('1');

    await expect(page.locator('.clear-completed')).toBeVisible();

})

test("Complete all tasks from the 'Active' tab using the multiple 'Toggle'", async ({page}) =>{

    const newTask = page.locator('.new-todo');


    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await newTask.type('First task',{delay:200});
    await page.keyboard.press('Enter');

    await newTask.type('Second task',{delay:200});
    await page.keyboard.press('Enter');

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/"]')).toHaveClass('selected');

    await page.locator('a[href="#/active"]').click();

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('2');

    await expect(page.locator('a[href="#/active"]')).toHaveClass('selected');

    await page.locator('#toggle-all').click();

    //await page.waitForTimeout(1000);

    //Investigate if I can validate that .todo-list has all items completed

    await expect(page.locator('.todo-list')).toBeHidden();

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('.clear-completed')).toBeVisible();
})


test("Complete all tasks from the 'Completed' tab using the multiple 'Toggle'", async ({page}) =>{

    const newTask = page.locator('.new-todo');


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

    await page.locator('#toggle-all').click();

    //await page.waitForTimeout(1000);

    //Investigate if I can validate that .todo-list has all items completed

    await expect(page.locator('.todo-list li')).toHaveCount(2);

    await expect(page.locator('.todo-count')).toContainText('0');

    await expect(page.locator('.clear-completed')).toBeVisible();
})

