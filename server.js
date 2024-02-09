const { path, fs } = require('sbg-utility');
const express = require('express');

const app = express();
// serve static files
const staticPaths = [path.join(__dirname, 'dist'), __dirname];
staticPaths
  .filter(dir => fs.existsSync(dir))
  .map(dir => {
    return {
      dir,
      files: fs.readdirSync(dir).map(file => path.join(dir, file))
    };
  })
  .flat()
  .forEach(o => {
    const pathname = o.dir.replace(path.toUnix(__dirname), '');
    console.log('register static', pathname, '->', o.dir);
    app.use(pathname, express.static(o.dir));
    app.use(express.static(o.dir));
  });

const server = app.listen(4000, function () {
  const host = 'localhost';
  const port = server.address().port;
  console.log('listening on http://' + host + ':' + port + '/');
});
