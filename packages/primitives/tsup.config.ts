import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/button/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'react-dom'],
});
