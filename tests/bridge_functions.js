import { randomInt } from "crypto";
import { chromium } from 'playwright';
import * as allure from 'allure-js-commons';

export async function SearchAndOpenPage(page, searchText) {
    await page.goto('');
    await page.getByLabel('Search').click();
    await page.frameLocator('iframe[title="undefined"]').getByRole('textbox', { name: 'Tell me what you want to do' }).fill(searchText);
    await page.frameLocator('iframe[title="undefined"]').locator('[id^="GroupedListSection"]').getByText(searchText, { exact: true }).click();
  }
  
export function RandInt(range) {
    const min = 1;
    const max = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export async function takeScreenshotAndAttach(page, testInfo, name, path) {
  await page.waitForTimeout(4000);  
  await page.screenshot({ path });
  await testInfo.attach(name, { path, contentType: 'image/png', mode: 'inline',});
}

export async function takeScreenshotAndAttach2(page, testInfo, name, path) {
  const screenshotBuffer = await page.screenshot();
  const base64 = screenshotBuffer.toString('base64');  
  const imgHtml = `
    <div style="margin:10px 0;">
      <img src="data:image/png;base64,${base64}" 
           style="max-width:100%; border:1px solid #ccc; border-radius:4px;" />
    </div>
  `;

  // Вложение HTML — безопасная простая строка
  allure.attachment(name, imgHtml, 'text/html',);
}