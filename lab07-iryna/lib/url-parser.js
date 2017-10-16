'use strict';
const url = require('url');
let urlParser = module.exports = {};
urlParser.run = function(req){
      return url.parse(req.url, true);    
}
