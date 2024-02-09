const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const path = require('path');
const bundleSize = require('rollup-plugin-bundle-size');
const { babel } = require('@rollup/plugin-babel');
const tsconfigBuild = require('./tsconfig.build.json');

const lib = require('./package.json');
const outputFileName = 'light-autocomplete';
const namedInput = './src/autocomplete.js';

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
      typescript.default({ compilerOptions: tsconfigBuild.compilerOptions }),
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
      plugins: [
        typescript.default({ compilerOptions: { ...tsconfigBuild.compilerOptions, declaration: false } }),
        resolve(),
        commonjs()
      ]
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
