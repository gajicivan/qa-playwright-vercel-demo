import { test, expect } from '@playwright/test';

test('API login success', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: {
      username: 'admin',
      password: 'admin123'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.token).toBeDefined();
});

test('API login fail', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: {
      username: 'admin',
      password: 'wrong'
    }
  });

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.success).toBe(false);
});