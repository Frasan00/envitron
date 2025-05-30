import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  minify: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
});
