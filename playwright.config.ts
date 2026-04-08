import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// 🔥 bira env (default dev)
const ENV = process.env.ENV || 'dev';

// učitaj odgovarajući .env fajl
dotenv.config({ path: `.env.${ENV}` });

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
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
  ],

  webServer: ENV === 'dev'
    ? {
        command: 'npx serve public -l 3000',
        port: 3000,
        reuseExistingServer: true,
      }
    : undefined,
});