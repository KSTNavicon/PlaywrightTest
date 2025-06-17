import { test, expect } from '@playwright/test';
import { SearchAndOpenPage, RandInt } from './bridge_functions';

test.use({ 
  storageState: 'playwright/.auth/ks_user.json',
  video: 'on'
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Check Sales & Receivables Setup', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Sales & Receivables Setup' });

    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');
    
    await SearchAndOpenPage(page, 'Sales & Receivables Setup');
    await page.waitForTimeout(5000);

    await page.screenshot({ path: 'screenshots/Sales_Setup.png' });

    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Create Item from Description' })).not.toBeChecked();


    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Invoice Rounding' })).not.toBeChecked();
    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Check Sales Reserve On Post' })).not.toBeChecked();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('S-INV');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('S-INV+');
});

// @allure.tag: regression
// @allure.tag: purchases
// @allure.tag: dev
test('Check Purchases & Payables Setup', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Purchases & Payables Setup' });

    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');

    await SearchAndOpenPage(page, 'Purchases & Payables Setup');
    await page.waitForTimeout(5000);

    await page.screenshot({ path: 'screenshots/Purchases_Setup.png' });

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Appln. between Currencies')).toContainText('None');
    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Synch. Agreement Dimension' })).not.toBeChecked();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('P-INV');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('P-INV+');
});

// @allure.tag: regression
// @allure.tag: inventory
// @allure.tag: dev
test('Check Inventory Setup', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Inventory Setup' });

    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');

    await SearchAndOpenPage(page, 'Inventory Setup');
    await page.waitForTimeout(10000);

    await page.screenshot({ path: 'screenshots/Purchases_Setup.png' });

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Automatic Cost Adjustment')).toContainText('Always');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Costing Method')).toContainText('FIFO');
    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Location Mandatory' })).not.toBeChecked();
});

// @allure.tag: regression
// @allure.tag: permissions
// @allure.tag: dev
test('Check Role Center', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка видимости Role Center' });

    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');
    await page.waitForTimeout(50000);

    await page.screenshot({ path: 'screenshots/Role_Center.png' });

    await expect(await(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Sales Orders - Open 38 " / "' }))).toBeVisible();
    await expect(await(page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Not Posted Pa… JT 0 " / "' }))).toBeVisible();
});

// @allure.tag: regression
// @allure.tag: sales
// @allure.tag: dev
test('Check Customer Agreements', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка видимости Customer Agreements' });

    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');

    await SearchAndOpenPage(page, 'Customers');
    await page.waitForTimeout(10000);

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'No., sorted in Ascending order CONT000001' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Agreements' })).toBeVisible();
    await page.screenshot({ path: 'screenshots/Agreements_Action.png' });
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'Agreements' }).click();
    
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('menuitem', { name: 'New' })).toBeVisible();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().locator('div').filter({ hasText: /^Attachments$/ }).first()).toBeVisible();
    await page.screenshot({ path: 'screenshots/Agreements_Page.png' });
});
