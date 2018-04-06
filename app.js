//http://team-tree-profile-js-node-drakematfield.c9users.io:8081/
var router = require("./router.js");
const http = require('http');
const hostname = '127.0.0.1';
const port = 8081;//1331


http.createServer(function (request, response) {
router.home(request, response);
router.user(request, response);

}).listen(port);

  //console.log(`Server running at http://${hostname}:${port}/`);

console.log(`Server running on port: ${port}/`);



