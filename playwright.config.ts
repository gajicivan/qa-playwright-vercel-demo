
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true
  },
   webServer: {
    command: 'npx vercel dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120 * 1000, // 2 min
  },
});
