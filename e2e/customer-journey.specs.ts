import { test, expect } from '@playwright/test';

test.describe('Customer Critical Path', () => {
  
  // Setup: Mock the authentication state so we don't hit real Google servers every time
  test.use({
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:3000',
          localStorage: [
            {
              name: 'next-auth.session-token',
              value: 'mock-session-token-for-testing-purposes'
            }
          ]
        }
      ]
    }
  });

  test('User can update profile to build a "Strong Profile"', async ({ page }) => {
    // 1. Navigation
    await page.goto('/settings/profile');
    
    // 2. Interaction
    await page.getByLabel('Full Name').fill('Tesla User');
    await page.getByLabel('Company').fill('SpaceX Corp');
    await page.getByLabel('Phone Number').fill('+15550199');
    
    // 3. Save Action
    const saveButton = page.getByRole('button', { name: 'Save Changes' });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    // 4. Verification (Toast or UI update)
    await expect(page.getByText('Profile updated successfully')).toBeVisible();
  });

  test('User can request account offloading (deletion)', async ({ page }) => {
    await page.goto('/settings/account');

    // 1. Trigger Deletion Flow
    await page.getByRole('button', { name: 'Delete Account' }).click();

    // 2. Handle Confirmation Modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // 3. Enter confirmation details
    await modal.getByPlaceholder('Type your email to confirm').fill('user@example.com');
    await modal.getByLabel('Reason').fill('Switching to another provider');

    // 4. Submit
    await modal.getByRole('button', { name: 'Confirm Deletion Request' }).click();

    // 5. Verify Success State
    await expect(page.getByText('Deletion request submitted')).toBeVisible();
    // In a real E2E, we would also verify the email was sent via a mock mail server
  });
});
