//@ts-check
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';

const lib = join(__dirname, 'lib');

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

export default defineConfig([
  {
    // Run tsc and create type definitions
    input: 'lib/index.ts',
    external: ['react'],
    plugins: [
      typescript({})
    ],

    output: {
      dir: '.temp'
    }
  },
  {
    // Bundle d.ts files into one
    input: '.temp/lib/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
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
        delimiters: ['', ''],
        preventAssignment: true,
      }),
      dts()
    ]
  }
]);