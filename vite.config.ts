import path, { basename } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import injectCSS from './viteInjectCSS';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), injectCSS()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'pcake',
      fileName: format => `pcake.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  css: {
    modules: {
      generateScopedName: (name, filePath) => {
        const matches = basename(filePath).match(/^([a-z-]+)(.module)?.s?css/);
        if (!matches) {
          throw new Error();
        }
        const baseFilename = matches[1];
        return `pcake-${baseFilename}-${name}`;
      },
      localsConvention: 'camelCaseOnly'
    }
  }
});
