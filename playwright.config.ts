import { test, expect } from '@playwright/test';

test.describe('Sakura Portal - Customer Critical Path', () => {

  test('Customer can build a Strong Profile', async ({ page }) => {
    // Navigate and check for 404
    const response = await page.goto('/axis/portal/settings');
    expect(response?.status()).toBe(200);

    // Use accessible locators instead of IDs [Best Practice]
    await page.getByLabel(/full name/i).fill('Jumbenylon Admin');
    await page.getByLabel(/organization/i).fill('Sakura Group Ltd');
    
    // Click Save and handle potential dialogs
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /save/i }).click();

    // Verify UI feedback
    await expect(page.getByText(/successfully/i)).toBeVisible();
  });
});
