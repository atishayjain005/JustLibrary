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
