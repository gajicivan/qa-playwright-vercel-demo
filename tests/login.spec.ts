import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login UI', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.valid.username, users.valid.password);

    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);

    // 🔥 bolja provera
    const error = await login.getError();
    expect(error).toContain('Invalid');
  });
});