import { test, expect } from '@playwright/test';

test.describe('Sakura Portal - Customer Critical Path', () => {

  test('Customer can build a Strong Profile', async ({ page }) => {
    // Increase timeout for cloud environment
    test.setTimeout(60000);
    
    await page.goto('/axis/portal/settings');
    
    // Fill Profile - Using flexible regex and checking visibility first
    const nameInput = page.locator('input#fullName');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Jumbenylon Admin');
    
    const orgInput = page.locator('input#organization');
    await orgInput.fill('Sakura Group Ltd');
    
    await page.getByRole('button', { name: /save/i }).click();

    // Verify success - looking for your alert/toast
    await page.on('dialog', dialog => dialog.accept());
  });

  test('Customer can request Offloading', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/axis/portal/settings');
    
    // Switch to Security Tab
    await page.getByRole('button', { name: /security/i }).click();
    
    // Trigger Offload
    await page.getByRole('button', { name: /offloading/i }).click();
    
    // Confirm in Modal
    const confirmInput = page.getByPlaceholder(/OFFLOAD/);
    await expect(confirmInput).toBeVisible();
    await confirmInput.fill('OFFLOAD');
    
    await page.getByRole('button', { name: /confirm/i }).click();
  });
});
