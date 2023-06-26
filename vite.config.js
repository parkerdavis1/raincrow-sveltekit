import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import jsonServer from 'vite-plugin-simple-json-server';

export default defineConfig({
	plugins: [
		sveltekit(),
		jsonServer({
			mockDir: 'src/mock'
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
