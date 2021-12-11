//@ts-check
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
// import { terser } from 'rollup-plugin-terser';

const lib = join(__dirname, 'lib');
const dist = join(__dirname, 'dist');

/** Alias every directory under `lib`, so that "baseUrl" paths are replaced with actual paths. */

/** @type {import('@rollup/plugin-alias').Alias[]} */
const pathAliases = readdirSync(lib, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .flatMap(name => [
    {
      find: new RegExp(`^${name}`),
      replacement: resolve(lib, `./${name}`)
    },
    {
      find: new RegExp(`^${name}(/.+)`),
      replacement: resolve(lib, `./${name}$1`)
    }
  ]
  );

const externals = ['react', 'react-dom', 'react/jsx-runtime', 'classnames/dedupe'];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsx'
};

export default defineConfig([
  {
    // Main build step
    input: join(lib, 'index.ts'),
    external: externals,
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true
      }),
      postcss({
        modules: true,
        extract: false
      }),
      terser()
    ],

    output: [{
      file: join(dist, 'pcake.es.js'),
      format: 'es',
      name: 'pcake',
      globals

    }, {
      file: join(dist, 'pcake.umd.js'),
      format: 'umd',
      name: 'pcake',
      globals
    }]
  },
  {
    // Bundle d.ts files into one
    input: '.temp/lib/index.d.ts',
    output: {
      file: join(dist, 'index.d.ts'),
      format: 'es',
      globals: {
        react: 'React'
      }
    },
    plugins: [
      alias({
        entries: pathAliases
      }),
      replace({
        "import './reset.css'": '',
        'createTheme({})': '',
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      dts()
    ]
  },
  {
    // Extract bundled css (for potential SSR support)
    input: join(lib, 'index.ts'),
    external: externals,

    plugins: [
      typescript({
        check: false,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          noEmit: true,
          declaration: false
        }
      }),
      postcss({
        modules: true,
        extract: true
      }),
    ],

    output: {
      file: join(dist, 'pcake.css')
    }
  }
]);