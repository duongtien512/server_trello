"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _sorts = require("./utilities/sorts.js");

var app = (0, _express["default"])();
var hostname = 'localhost';
var port = 8000;
app.get('/', function (req, res) {
  res.end('<h1>Hello</h1>');
});
app.listen(port, hostname, function () {
  console.log("Server running at ".concat(hostname, ":").concat(port));
});