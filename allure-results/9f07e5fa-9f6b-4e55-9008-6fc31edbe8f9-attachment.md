# Test info

- Name: Check Sales & Receivables Setup
- Location: C:\Users\kstankevich\Documents\GitHub\PlaywrightTest\tests\CheckSetup.test.ts:11:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG
Call log:
  - navigating to "http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG", waiting until "load"

    at C:\Users\kstankevich\Documents\GitHub\PlaywrightTest\tests\CheckSetup.test.ts:14:16
```

# Page snapshot

```yaml
- heading "Не удается открыть эту страницу" [level=1]
- paragraph:
  - strong: nav-buscent24w2
  - text: не удалось найти IP-адрес сервера.
- paragraph: "Попробуйте:"
- list:
  - listitem: •Проверка подключения
  - listitem: •Проверка настроек прокси-сервера, брандмауэра и DNS
- text: ERR_NAME_NOT_RESOLVED
- button "Обновить"
- text: Microsoft Edge
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { SearchAndOpenPage, RandInt, takeScreenshotAndAttach } from './bridge_functions';
   3 |
   4 | test.use({ 
   5 |   video: 'on'
   6 | });
   7 |
   8 | // @allure.tag: regression
   9 | // @allure.tag: sales
  10 | // @allure.tag: dev
  11 | test('Check Sales & Receivables Setup', async ({ page }, testInfo) => {
  12 |     testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Sales & Receivables Setup' });
  13 |
> 14 |     await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
     |                ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG
  15 |     
  16 |     await SearchAndOpenPage(page, 'Sales & Receivables Setup');
  17 |     await page.waitForTimeout(2000);
  18 |
  19 |     await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/Sales_Setup.png');
  20 |
  21 |     await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Create Item from Description' })).not.toBeChecked();
  22 |
  23 |
  24 |     await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Invoice Rounding' })).toBeChecked();
  25 |     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');
  26 |
  27 |     await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
  28 |     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('V-RG');
  29 |     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('V-RG+');
  30 | });
  31 |
  32 | // // @allure.tag: regression
  33 | // // @allure.tag: purchases
  34 | // // @allure.tag: dev
  35 | // test('Check Purchases & Payables Setup', async ({ page }, testInfo) => {
  36 | //     testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Purchases & Payables Setup' });
  37 |
  38 | //     await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  39 |
  40 | //     await SearchAndOpenPage(page, 'Purchases & Payables Setup');
  41 | //     await page.waitForTimeout(2000);
  42 |
  43 | //     await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/Purchases_Setup.png');
  44 |
  45 | //     await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
  46 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Appln. between Currencies')).toContainText('None');
  47 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Posting Date')).toContainText('Work Date');
  48 | //     await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'Number Series" / "' }).click();
  49 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Invoice Nos.', exact: true })).toHaveValue('E-RG');
  50 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByRole('combobox', { name: 'Posted Invoice Nos.' })).toHaveValue('E-RG+');
  51 | // });
  52 |
  53 | // // @allure.tag: regression
  54 | // // @allure.tag: inventory
  55 | // // @allure.tag: dev
  56 | // test('Check Inventory Setup', async ({ page }, testInfo) => {
  57 | //     testInfo.annotations.push({ type: 'description', description: 'Проверка настроек Inventory Setup' });
  58 |
  59 | //     await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
  60 |
  61 | //     await SearchAndOpenPage(page, 'Inventory Setup');
  62 | //     await page.waitForTimeout(10000);
  63 |
  64 | //     await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/Purchases_Setup.png');
  65 |
  66 | //     await page.locator('iframe[title="undefined"]').contentFrame().getByRole('button', { name: 'General, Show more' }).click();
  67 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Automatic Cost Adjustment')).toContainText('Always');
  68 | //     await expect(page.locator('iframe[title="undefined"]').contentFrame().getByLabel('Default Costing Method')).toContainText('FIFO');
  69 | //     await expect(await (await page.locator('iframe[title="undefined"]').contentFrame()).getByRole('checkbox', { name: 'Location Mandatory' })).not.toBeChecked();
  70 | // });
  71 |
```