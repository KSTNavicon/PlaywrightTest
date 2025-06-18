import { randomInt } from "crypto";
import { chromium } from 'playwright';

export async function SearchAndOpenPage(page, searchText) {
    await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');
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
    await page.screenshot({ path });
    await testInfo.attach(name, { path, contentType: 'image/png' });
}

  