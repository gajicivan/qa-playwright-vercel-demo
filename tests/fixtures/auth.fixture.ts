import { test as base, Page } from '@playwright/test';

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/dashboard.html'); // već si ulogovan
    await use(page);
  },
});

export const expect = test.expect;