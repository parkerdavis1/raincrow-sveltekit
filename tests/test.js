import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'RainCrow' })).toBeVisible();
});

test('index page has nav bar', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Submitted' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Pre-Submit' })).toBeVisible();
});
