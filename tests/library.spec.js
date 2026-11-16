const { test, expect } = require('@playwright/test');
async function add(page, name = 'Test Book', author = 'Test Author') {
  await page.locator('#bookName').fill(name);
  await page.locator('#author').fill(author);
  await page.getByRole('button', {name:'Add Book',exact:true}).click();
}
test('book markup remains inert after adding and reloading', async ({page}) => {
  await page.goto('/');
  const title = '<img src=x onerror="window.injected=true">';
  await add(page,title);
  await expect(page.locator('#tableBody')).toContainText(title);
  await page.reload();
  await expect(page.locator('#tableBody img')).toHaveCount(0);
  await expect(page.locator('#tableBody')).toContainText(title);
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
});

test('invalid input never reaches storage; valid values are trimmed', async ({page}) => {
  await page.goto('/');
  await add(page, '   ', 'A');
  expect(await page.evaluate(() => localStorage.getItem('bookList'))).toBeNull();
  await expect(page.locator('#bookName')).toHaveValue('   ');
  await add(page, '  Good Book  ', '  An Author  ');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('bookList')))).toEqual([{name:'Good Book',author:'An Author',type:'fiction'}]);
});

for (const saved of ['', '{broken', '{"not":"array"}']) {
  test('preserve unreadable storage '+saved, async ({page}) => {
    await page.addInitScript(value => localStorage.setItem('bookList',value), saved);
    await page.goto('/');
    await expect(page.locator('#message')).toContainText('could not be read');
    await add(page);
    expect(await page.evaluate(() => localStorage.getItem('bookList'))).toBe(saved);
    await expect(page.locator('#bookName')).toHaveValue('Test Book');
  });
}
test('failed writes retain the form and never announce success', async ({page}) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => {throw new DOMException('Full','QuotaExceededError');}; });
  await page.goto('/');
  await add(page);
  await expect(page.locator('#message')).toContainText('could not be saved');
  await expect(page.locator('#bookName')).toHaveValue('Test Book');
  await expect(page.locator('#tableBody tr')).toHaveCount(0);
});

test('delete targets original storage index despite invalid legacy rows', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('bookList', JSON.stringify([null,{name:'x',author:'y'}, {name:'Keep',author:'Author',type:'fiction'},{name:'Remove',author:'Author',type:'cooking'}])));
  await page.reload();
  await page.getByRole('row').filter({hasText:'Remove'}).getByRole('button').click();
  await page.reload();
  await expect(page.locator('#tableBody')).toContainText('Keep');
  await expect(page.locator('#tableBody')).not.toContainText('Remove');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('bookList')).length)).toBe(3);
});
test('stale tabs cannot delete a newly replaced entry', async ({page}) => {
  await page.goto('/');
  await add(page);
  await page.evaluate(() => localStorage.setItem('bookList', JSON.stringify([{name:'New book',author:'Other author',type:'fiction'}])));
  await page.getByRole('button',{name:'Delete',exact:true}).click();
  await expect(page.locator('#tableBody')).toContainText('New book');
  await expect(page.locator('#message')).toContainText('changed in another tab');
});

test('keyboard form, dismiss, empty state and narrow layout', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#emptyState')).toBeVisible();
  await page.getByLabel('Name :', {exact:true}).fill('A very long book title '.repeat(15));
  await page.getByLabel('Author :', {exact:true}).fill('Test Author');
  await page.getByLabel('Author :', {exact:true}).press('Enter');
  await expect(page.locator('#bookName')).toBeFocused();
  await expect(page.locator('#emptyState')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button',{name:'Dismiss'}).click();
  await expect(page.locator('#message')).toBeEmpty();
  await page.getByRole('button',{name:'Delete',exact:true}).click();
  await expect(page.locator('#emptyState')).toBeVisible();
  await page.screenshot({path:'test-results/library-'+test.info().project.name+'.png',fullPage:true});
});

for (const records of [[null], [null, {name:'Readable book',author:'Author',type:'fiction'}]]) {
  test('hidden legacy records are explained and preserved '+records.length, async ({page}) => {
    await page.goto('/');
    await page.evaluate(records => localStorage.setItem('bookList',JSON.stringify(records)), records);
    await page.reload();
    await expect(page.locator('#storageNotice')).toContainText('1 saved record(s)');
    await expect(page.locator('#emptyState')).toBeHidden();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('bookList')))).toEqual(records);
    await add(page);
    await expect(page.locator('#storageNotice')).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('bookList'))[0])).toBeNull();
  });
}
