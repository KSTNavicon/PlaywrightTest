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

    await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
    
    await SearchAndOpenPage(page, 'Sales & Receivables Setup');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'screenshots/Sales_Setup.png' });

    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Create Item from Description' })).not.toBeChecked();


    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Invoice Rounding' })).toBeChecked();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('V-RG');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('V-RG+');
});

// @allure.tag: regression
// @allure.tag: purchases
// @allure.tag: dev
test('Check Purchases & Payables Setup', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Purchases & Payables Setup' });

    await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');

    await SearchAndOpenPage(page, 'Purchases & Payables Setup');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'screenshots/Purchases_Setup.png' });

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Appln. between Currencies')).toContainText('None');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');
    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('E-RG');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('E-RG+');
});

// @allure.tag: regression
// @allure.tag: inventory
// @allure.tag: dev
test('Check Inventory Setup', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Inventory Setup' });

    await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');

    await SearchAndOpenPage(page, 'Inventory Setup');
    await page.waitForTimeout(10000);

    await page.screenshot({ path: 'screenshots/Purchases_Setup.png' });

    await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Automatic Cost Adjustment')).toContainText('Always');
    await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Costing Method')).toContainText('FIFO');
    await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Location Mandatory' })).not.toBeChecked();
});
