
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry'
  },
   projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'ui',
      testMatch: /.*\.spec\.ts/,
      use: {
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ]
});
