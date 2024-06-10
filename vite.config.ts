import { createRequire } from 'module';
import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// allows importing prisma client from the browser for type safety
// https://github.com/prisma/prisma/issues/12504#issuecomment-1599452566
const { resolve } = createRequire(import.meta.url);
const prismaClient = `prisma${path.sep}client`;
const prismaClientIndexBrowser = resolve('@prisma/client/index-browser').replace(
  `@${prismaClient}`,
  `.${prismaClient}`
);

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  resolve: { alias: { '.prisma/client/index-browser': path.relative(__dirname, prismaClientIndexBrowser) } },
});
