import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 80000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: false,
      suiteTitle: false,
      environment: {
        'Dev': 'http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG&dc=0',
      },
    }]
  ],
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://nav-buscent24w2:8080/BC252/?company=CRONUS%20AG&dc=0'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});