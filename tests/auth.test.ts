import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/ks_user.json');

// setup('ks_auth', async ({ page }) => {
//     await page.goto('http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG');

//     await page.getByPlaceholder('Email or phone').click();
//     await page.getByPlaceholder('Email or phone').fill('ks@bridgechemicals.com');
//     await page.getByRole('button', { name: 'Next' }).click();

//     await page.getByPlaceholder('Password').click();
//     await page.getByPlaceholder('Password').fill('NavSummer2023!');
//     await page.getByRole('button', { name: 'Sign in' }).click();

//     await page.getByRole('button', { name: 'Yes' }).click();
    
//     await page.context().storageState({ path: authFile });
// });