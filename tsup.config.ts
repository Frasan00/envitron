import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  skipNodeModulesBundle: true,
});
