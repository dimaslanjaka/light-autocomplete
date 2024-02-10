const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const path = require('path');
const sass = require('sass');
const bundleSize = require('rollup-plugin-bundle-size');
const { babel } = require('@rollup/plugin-babel');
const tsconfigBuild = require('./tsconfig.build.json');
const browsersync = require('rollup-plugin-browsersync');
/** @type {import('@rollup/plugin-typescript').RollupTypescriptOptions} */
const typescriptRollupOptions = {
  compilerOptions: tsconfigBuild.compilerOptions,
  exclude: ['**/__tests__', '**/*.test.ts', '**/test/**']
};
const lib = require('./package.json');
const { writefile } = require('sbg-utility');
const outputFileName = 'light-autocomplete';
const namedInput = './src/autocomplete.js';
const isDev = process.env.NODE_ENV == 'development';

const buildConfig = ({ es5, browser = true, minifiedVersion = true, ...config }) => {
  const { file } = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();

  const build = ({ minified }) => ({
    input: namedInput,
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
    },
    plugins: [
      typescript.default(typescriptRollupOptions),
      json(),
      resolve({ browser }),
      commonjs(),
      minified && terser(),
      minified && bundleSize(),
      ...(es5
        ? [
            babel({
              babelHelpers: 'bundled',
              presets: ['@babel/preset-env']
            })
          ]
        : []),
      // compile style
      {
        name: 'closeBundle',
        closeBundle() {
          console.log('compile stylesheet');
          writefile(
            path.join(__dirname, 'dist/style.css'),
            sass.compile(path.join(__dirname, 'src/style.scss'), {
              style: 'expanded',
              loadPaths: [path.join(__dirname, 'node_modules')]
            }).css
          );
          writefile(
            path.join(__dirname, 'dist/style.min.css'),
            sass.compile(path.join(__dirname, 'src/style.scss'), {
              style: 'compressed',
              loadPaths: [path.join(__dirname, 'node_modules')]
            }).css
          );
        }
      },
      // dev server
      isDev && browsersync({ server: '.', port: 8080, open: false, cors: true, reloadOnRestart: true, notify: true }),
      // override plugins
      ...(config.plugins || [])
    ]
  });

  const configs = [build({ minified: false })];

  if (minifiedVersion) {
    configs.push(build({ minified: true }));
  }

  return configs;
};

const configFunc = async () => {
  const year = new Date().getFullYear();
  const banner = `// Light Auto Complete v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`;

  return [
    ...buildConfig({
      input: './src/autocomplete.js',
      es5: true,
      minifiedVersion: true,
      output: {
        file: 'dist/browser/light-autocomplete.js',
        format: 'iife',
        name: 'autocomplete'
      }
    }),

    // bundle sample.js
    ...buildConfig({
      input: './src/sample.ts',
      minifiedVersion: true,
      es5: true,
      output: {
        file: 'dist/demo/sample.js',
        format: 'iife',
        banner
      },
      plugins: [typescript.default({ ...typescriptRollupOptions, declaration: false }), resolve(), commonjs()]
    }),

    // browser ESM bundle for CDN
    ...buildConfig({
      input: namedInput,
      output: {
        file: `dist/esm/${outputFileName}.js`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
        banner
      }
    })
  ];
};

module.exports = configFunc;
