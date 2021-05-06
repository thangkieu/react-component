var path = require('path');
var fs = require('fs');
var express = require('express');
var https = require('https');

var certOptions = {
  key: fs.readFileSync(path.resolve(path.join(__dirname, 'server.key'))),
  cert: fs.readFileSync(path.resolve(path.join(__dirname, './server.crt'))),
};

var app = express();
app.use(express.static(path.join(__dirname, 'build')));

https.createServer(certOptions, app).listen(5000);
