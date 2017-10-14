'use strict';


const http = require('http');
const url = require('url');
const cowsay = require("cowsay");
const PORT = 8000;
const bodyParser = require("./lib/body-parser");
const urlParser = require("./lib/url-parser.js")
const path = require("path");
const fs = require('fs');

let sendResponse = function(res, status, type, body) {
  res.writeHead(status, {'Content-Type': '${type}'});
  res.write(body);
  res.end();
};

const server = module.exports = http.createServer((req, res) => {

   req.url = urlParser.run(req);
  //  console.log(req.method, req.body, req.url);

  if (req.method === 'GET' && req.url.pathname === '/') {
      sendResponse( res, 200, 'text/html', `<html>
        <head>
          <title> cowsay </title>
        </head>
        <body>
         <header>
           <nav>
             <ul>
               <li><a href="/cowsay">cowsay</a></li>
             </ul>
           </nav>
         <header>
         <main>
           <p> This should be my project description </p>
         </main>
        </body>
      </html>`);
 } else
   if (req.method === 'GET' && req.url.pathname === '/cowsay'){
     if(req.url.query) {
       sendResponse(res, 200, "text/html", cowsay.say({text: `${req.url.query}`}))
     } else {
      sendResponse(res, 200, "text/html", cowsay.say({text:'I need something good to say'}))
     }

  } else
  if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
    bodyParser.run(req)
    .then((body)=>{
      sendResponse(res, 200, "text/json", `{ "content": ${JSON.stringify(body)} }`);
    }).catch((err)=>console.log(err))

  } else {
    sendResponse(res, 400, "text/html", 'bad request');
  }
});
server.listen(PORT,console.log('running on', PORT));
