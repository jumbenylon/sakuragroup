import { test, expect } from '@playwright/test';

test.describe('Sakura Portal Critical Path', () => {
  test('Page loads and redirects/shows login', async ({ page }) => {
    await page.goto('/');
    // Checks if we at least hit the app title or login inputs
    await expect(page).toHaveTitle(/Sakura|Axis|Login/i);
  });
});
