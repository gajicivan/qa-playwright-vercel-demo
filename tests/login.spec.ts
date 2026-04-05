import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('UI login success', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
});

test('UI login fail', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('admin', 'wrong');

  await expect(page).toHaveURL('/');
});