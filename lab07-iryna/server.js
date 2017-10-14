'use strict';


const http = require('http');
const url = require('url');
const cowsay = require("cowsay");
const PORT = 8000;
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');

let sendResponse = function(res, status, type, body) {
  res.writeHead(status, {'Content-Type': '${type}'});
  res.write(body);
  res.end();
};

const server = module.exports = http.createServer((req, res) => {

  req.url = url.parse(req.url);

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

  } else if (req.method === 'POST' && req.url.pathname === '/') {

   let text = '';
    req.on('data', function(data) {
      text += data.toString();
      console.log(text);
    });

    req.on('end', function() {
      let json;
      try {
        json = JSON.parse(body);
      } catch(e) {
        return sendResponse(res, 400,"text/html", 'bad json!');
      }
      console.log(json);
      sendResponse(res, 200, "text/html",'got the JSON');
    });
  } else {
    sendResponse(res, 400, "text/html", 'bad request');
  }
});
server.listen(PORT,console.log('running on', PORT));
