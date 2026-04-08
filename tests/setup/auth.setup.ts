import { test as setup, request } from '@playwright/test';
import { users } from '../../test-data/users';
import fs from 'fs';

// 🔥 uzimamo BASE_URL iz env-a (multi-env podrška)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

setup('authenticate via API', async () => {
  // 📡 kreiramo API context
  const context = await request.newContext({
    baseURL: BASE_URL,
  });

  // 🔐 login preko API-ja
  const response = await context.post('/api/login', {
    data: {
      username: users.valid.username,
      password: users.valid.password,
    },
  });

  // 🧪 validacija (bitno!)
  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  const body = await response.json();

  // 🔥 proveri da li postoji token
  if (!body.token) {
    throw new Error('No token received from API');
  }

  // 🧠 kreiramo storageState ručno
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: BASE_URL,
        localStorage: [
          {
            name: 'token',
            value: body.token,
          },
        ],
      },
    ],
  };

  // 💾 snimamo auth.json
  fs.writeFileSync('auth.json', JSON.stringify(storageState, null, 2));

  console.log('✅ Auth state saved for:', BASE_URL);
});