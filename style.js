const sass = require('sass');
const { path, writefile } = require('sbg-utility');
const result = sass.compile(path.join(__dirname, 'src/style.scss'), {
  style: 'expanded',
  loadPaths: [path.join(__dirname, 'node_modules')]
});
const saveto = path.join(__dirname, 'dist/style.css');
writefile(saveto, result.css);
