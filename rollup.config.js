import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const name = 'BUI';
const path = 'dist/bui';
const globals = {
  classnames: 'classNames',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-input-autosize': 'AutosizeInput',
  react: 'React',
};
const external = Object.keys(globals);
const babelOptions = {
  babelrc: false,
  presets: [['es2015', { modules: false }], 'stage-0', 'react'],
  plugins: ['external-helpers'],
};

export default [
  {
    input: 'src/index.js',
    output: {
      file: `${path}.es.js`,
      format: 'es',
    },
    external,
    plugins: [babel(babelOptions)],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: `${path}.js`,
      format: 'umd',
    },
    globals,
    external,
    plugins: [babel(babelOptions), resolve()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name,
      file: `${path}.min.js`,
      format: 'umd',
    },
    globals,
    external,
    plugins: [babel(babelOptions), resolve(), uglify({}, minify)],
  },
];
