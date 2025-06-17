import { test, expect } from '@playwright/test';
import { SearchAndOpenPage, RandInt } from './bridge_functions';

test.use({ 
  storageState: 'playwright/.auth/ks_user.json',
  video: 'on'
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Create new customer', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'description', description: 'Создание нового клиента и валидация полей.' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');

  await SearchAndOpenPage(page, 'Customers');
  await page.screenshot({ path: 'screenshots/before_new_customer.png' });

  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'New', exact: true }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Code, sorted in Ascending order NOAGR' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'OK' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Name' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Name' }).fill('Test Customer');

  await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Agreement Posting')).toContainText('No AgreementMandatory');
  
  const taxNumber = RandInt(100).toString();
  const taxOffice = RandInt(100).toString();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Invoicing, This group' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Tax Number' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Tax Number' }).fill(taxNumber);
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Tax Office' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('textbox', { name: 'Tax Office' }).fill(taxOffice);
  await page.screenshot({ path: 'screenshots/after_tax_info.png' });

  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for Gen. Bus.' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Gen. Bus. Posting Group' }).fill('DOMEST');
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Gen. Bus. Posting Group' }).press('Tab');
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Choose a value for Customer Posting Group' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Customer Posting Group' }).fill('CUST_DOM');
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Customer Posting Group' }).press('Tab');
  await page.screenshot({ path: 'screenshots/after_customer_creation.png' });

  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Delete the information' }).click();
  await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Yes' }).click();
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Open Customers and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'sales' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Customers');
  await expect(page.frameLocator('iframe[title="undefined"]').getByTitle('Show info about Customers')
          ).toBeVisible({ timeout: 10000 });

  await page.screenshot({ path: 'screenshots/after_open_customers_page.png' });
});

// @allure.tag: regression
// @allure.tag: purchasing
// @allure.tag: dev
test('Open Vendors and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'purchasing' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Vendors');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_vendors_page.png' });
});

// @allure.tag: regression
// @allure.tag: Inventory
// @allure.tag: dev
test('Open Items and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'Inventory' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Items');
  await expect(page.frameLocator('iframe[title="undefined"]').getByTitle('Show info about Items')
          ).toBeVisible({ timeout: 10000 });

  await page.screenshot({ path: 'screenshots/after_open_items_page.png' });
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Open Sales Orders and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'sales' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Sales Orders');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_sales_orders_page.png' });
});

// @allure.tag: regression
// @allure.tag: purchasing
// @allure.tag: dev
test('Open Purchase Orders and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'purchasing' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Purchase Orders');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_purchase_orders_page.png' });
});

// @allure.tag: regression
// @allure.tag: finance
// @allure.tag: dev
test('Open Chart of Accounts and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'finance' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_chart_of_accounts_page.png' });
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Open Posted Sales Invoices and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'sales' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Posted Sales Invoices');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_posted_sales_invoices_page.png' });
});

// @allure.tag: regression
// @allure.tag: purchasing
// @allure.tag: dev
test('Open Posted Purchase Invoices and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'purchasing' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Posted Purchase Invoices');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'screenshots/after_open_posted_purchase_invoices_page.png' });
});

// @allure.tag: regression
// @allure.tag: finance
// @allure.tag: dev
test('Open Bank Accounts and check table', async ({ page }, testInfo) => {
  testInfo.annotations.push({ type: 'tag', description: 'regression' });
  testInfo.annotations.push({ type: 'tag', description: 'finance' });
  testInfo.annotations.push({ type: 'tag', description: 'dev' });

  await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  await SearchAndOpenPage(page, 'Bank Accounts');
  await expect(page.frameLocator('iframe[title="undefined"]').getByTitle('Show info about Bank Accounts')
          ).toBeVisible({ timeout: 10000 });

  await page.screenshot({ path: 'screenshots/after_open_bank_accounts_page.png' });
});

