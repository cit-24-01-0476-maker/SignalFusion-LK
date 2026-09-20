const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const prepared = app.prepare();

module.exports = async (req, res) => {
  await prepared;
  const parsedUrl = parse(req.url, true);
  await handle(req, res, parsedUrl);
};

if (require.main === module) {
  prepared.then(() => {
    const port = process.env.PORT || 3000;
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}
