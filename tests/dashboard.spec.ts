import { test, expect } from './fixtures/auth.fixture';

test('dashboard loads for logged user @smoke @ui', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.locator('h2')).toHaveText('Dashboard');
});