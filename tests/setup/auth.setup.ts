import { test as setup, request } from '@playwright/test';
import { users } from '../../test-data/users';

setup('authenticate via API', async () => {
  const context = await request.newContext({
    baseURL: 'http://localhost:3000',
  });

  const response = await context.post('/api/login', {
    data: {
      username: users.valid.username,
      password: users.valid.password,
    },
  });

  const body = await response.json();

  // 🔥 ubacujemo token u storage
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:3000',
        localStorage: [
          {
            name: 'token',
            value: body.token,
          },
        ],
      },
    ],
  };

  // snimi auth stanje
  require('fs').writeFileSync(
    'auth.json',
    JSON.stringify(storageState, null, 2)
  );
});