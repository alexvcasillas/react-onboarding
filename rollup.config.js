import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/react-onboarding.js',
      format: 'cjs',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
    },
    external: ['react', 'prop-types'],
    plugins: [resolve(), babel(), filesize()],
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/react-onboarding.umd.js',
      format: 'umd',
      name: 'ReactOnboarding',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
    },
    external: ['react', 'prop-types'],
    plugins: [resolve(), babel(), terser(), filesize()],
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/react-onboarding.module.js',
      format: 'es',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
    },
    external: ['react', 'prop-types'],
    plugins: [resolve(), babel(), filesize()],
  },
];
