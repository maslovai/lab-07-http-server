'use strict';


const http = require('http');
const url = require('url');
const cowsay = require("cowsay");
const PORT = 8000;
const bodyParser = require("./lib/body-parser");
const urlParser = require("./lib/url-parser.js");
const fs = require('fs');

let sendResponse = function(res, status, type, body) {
  res.writeHead(status, {'Content-Type': `${type}`});
  res.write(body);
  res.end();
};

const server = module.exports = http.createServer((req, res) => {

   req.url = urlParser.run(req);
   console.log( req.url);

  if (req.method === 'GET' && req.url.pathname === '/') {
      sendResponse(res, 200, 'text/html',`${fs.readFileSync('./index.html').toString()}`);
    }

  else
   if (req.method === 'GET' && req.url.pathname === '/cowsay'){
     req.url = urlParser.run(req);
     if(req.url.query.text) {
       sendResponse(res, 200, "text/html", cowsay.say({text: `${req.url.query.text}`}))
     } else {
      sendResponse(res, 200, "text/html", cowsay.say({text:'I need something good to say'}))
     }

  } else
  if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
    bodyParser.run(req)
    .then((body)=>{
      sendResponse(res, 200, "text/json", `{ "content": ${JSON.stringify(body)} }`);
    }).catch((err)=>console.log(err))
   }
    else
    if(req.method === 'GET'&&req.url.pathname !== '/cowsay'){
      {
        sendResponse(res, 404, "text/html", 'address not found');
      }
    }
  else {
    sendResponse(res, 400, "text/html", '{"error": "invalid request: text query required"}');
  }

});
server.listen(PORT,console.log('running on', PORT));
