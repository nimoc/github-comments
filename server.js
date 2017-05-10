var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  name: 'github-comments',   // optional, will set "X-Powered-by" HTTP header
  port: 4543,               // optional, defaults to a random port
  host: '127.0.0.1',       // optional, defaults to any interface
  cors: '*',                 // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    index: 'index.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log('Server listening to http://127.0.0.1:' + server.port);
});
