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

test.beforeEach(async ({ context }) => {
	await context.route('https://api.ebird.org/v2/**', async (route) => {
		const json = {
			message: { checklist: ['info'] }
		};
		await route.fulfill({ json });
	});
	await context.route(
		'https://api.openweathermap.org/data/3.0/onecall/timemachine**',
		async (route) => {
			const json = {
				weather: { results: 'hot' }
			};
			await route.fulfill({ json });
		}
	);
});

test('makes mock API request', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Submitted' }).click();
	await page.getByLabel('Checklist ID:').click();
	await page.getByLabel('Checklist ID:').fill('https://ebird.org/checklist/S142104802');
	await page.getByRole('button', { name: 'Get Weather' }).click();
	await expect(page.getByTestId('weatherResultsPane').toContainText('fail'));
});
