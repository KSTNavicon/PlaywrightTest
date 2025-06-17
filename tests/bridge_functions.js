import { randomInt } from "crypto";
import { chromium } from 'playwright';

export async function SearchAndOpenPage(page, searchText) {
    await page.goto('https://businesscentral.dynamics.com/5d10e9a3-bb44-42da-a961-59c531132b7e/Development/?company=Bridge%20Chemicals');
    await page.getByLabel('Search').click();
    await page.frameLocator('iframe[title="undefined"]').getByRole('textbox', { name: 'Tell me what you want to do' }).fill(searchText);
    await page.frameLocator('iframe[title="undefined"]').locator('[id^="GroupedListSection"]').getByText(searchText, { exact: true }).click();
  }
  
export function RandInt(range) {
    const min = 1;
    const max = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  