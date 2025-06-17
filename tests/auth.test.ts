import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/ks_user.json');

// setup('ks_auth', async ({ page }) => {

// });