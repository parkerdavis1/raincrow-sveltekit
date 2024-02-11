import { expect, test } from '@playwright/test';

test('Error is displayed when user denies geolocation', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Pre-Submit' }).click();
	await page.getByRole('button', { name: 'Locate' }).click();
	await expect(page.getByText('Allow location access to use')).toBeVisible();
});

test.describe('When Geolocation is granted', () => {
	test.use({
		geolocation: { longitude: 41.890221, latitude: 12.492348 },
		permissions: ['geolocation']
	});

	test('Locate button works and fills out the input', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Pre-Submit' }).click();
		await page.getByRole('button', { name: 'Locate' }).click();
		await expect(page.getByLabel('Location (Latitude, Longitude)')).not.toBeEmpty();
	});
});
