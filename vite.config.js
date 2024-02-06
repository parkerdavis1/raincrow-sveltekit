import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import jsonServer from 'vite-plugin-simple-json-server';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'raincrow-qyu',
				project: 'raincrow',
				authToken: process.env.SENTRY_AUTH_TOKEN
			}
		}),
		sveltekit(),
		// jsonServer({
		// 	mockDir: 'src/mock',
		// 	delay: 300
		// })
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
