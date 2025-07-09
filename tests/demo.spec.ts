import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { SearchAndOpenPage, takeScreenshotAndAttach, takeScreenshotAndAttach2 } from './bridge_functions';

test.use({ video: 'on' });

// Основной сценарий Smoke Suite
test('Smoke Suite: Проверка основных страниц BC', async ({ page }, testInfo) => {
  // Описание и теги для отчёта Allure
  await allure.description(
    'Набор тестов для проверки ключевых страниц Business Central. ' +
    'Включает создание клиента и проверку таблиц основных справочников и документов.'
  );
  allure.tag('regression');
  allure.tag('dev');

  // Шаг 1: Переход на домашнюю страницу (baseURL из конфига)
  await test.step('Go to BC Home', async () => await page.goto(''));

  // Шаг 2: Открытие справочника Customers и проверка таблицы
  await test.step('Open Customers and check table', async () => {
    await SearchAndOpenPage(page, 'Customers');
    await takeScreenshotAndAttach2(page, testInfo, 'screenshot', 'screenshots/after_open_customers_page.png');
  });

  // Шаг 3: Открытие справочника Vendors и проверка таблицы
  await test.step('Open Vendors and check table', async () => {
    await SearchAndOpenPage(page, 'Vendors');
    await takeScreenshotAndAttach2(page, testInfo, 'screenshot', 'screenshots/after_open_vendors_page.png');
  });

  // Шаг 4: Открытие справочника Items и проверка таблицы
  await test.step('Open Items and check table', async () => {
    await SearchAndOpenPage(page, 'Items');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_items_page.png');
  });

  // Шаг 5: Открытие Sales Orders и проверка таблицы
  await test.step('Open Sales Orders and check table', async () => {
    await SearchAndOpenPage(page, 'Sales Orders');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_sales_orders_page.png');
  });

  // Шаг 6: Открытие Purchase Orders и проверка таблицы
  await test.step('Open Purchase Orders and check table', async () => {
    await SearchAndOpenPage(page, 'Purchase Orders');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_purchase_orders_page.png');
  });

  // Шаг 7: Открытие Posted Sales Invoices и проверка таблицы
  await test.step('Open Posted Sales Invoices and check table', async () => {
    await SearchAndOpenPage(page, 'Posted Sales Invoices');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_posted_sales_invoices_page.png');
  });

  // Шаг 8: Открытие Posted Purchase Invoices и проверка таблицы
  await test.step('Open Posted Purchase Invoices and check table', async () => {
    await SearchAndOpenPage(page, 'Posted Purchase Invoices');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_posted_purchase_invoices_page.png');
  });

  // Шаг 9: Открытие Bank Accounts и проверка таблицы
  await test.step('Open Bank Accounts and check table', async () => {
    await SearchAndOpenPage(page, 'Bank Accounts');
    await takeScreenshotAndAttach(page, testInfo, 'screenshot', 'screenshots/after_open_bank_accounts_page.png');
  });
});
