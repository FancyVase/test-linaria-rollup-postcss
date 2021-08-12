import linaria from '@linaria/rollup';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',

  output: [
    // Works w/ PostCSS, not with Linaria
    {
      dir: 'dist/preserveModules',
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
    },

    // Works w/ PostCSS & Linaria, but doesn't support tree-shaking
    {
      dir: 'dist/noPreserveModules',
      format: 'esm',
      sourcemap: true,
    },

    // Works w/ PostCSS & Linaria, but doesn't support tree-shaking
    {
      file: 'dist/cjs.bundle.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],

  external: ['react'],

  plugins: [
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),

    postcss({
      exclude: 'node_modules/**',
    }),

    babel(),
  ],
};
