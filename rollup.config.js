import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'dist/index.js',
  plugins: [
    json(),
    babel({ exclude: 'node_modules/**' }),
    includePaths({ paths: ['src', 'src/sources'] }),
  ],
};