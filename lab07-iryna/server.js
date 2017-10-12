'use strict';


const http = require('http');
const url = require('url');
const cowsay = require("cowsay");

let sendResponse = function(res, status, type, body) {
  res.writeHead(status, {'Content-Type': '${type}'});
  res.write(body);
  res.end();
};

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if (req.method === 'GET' && req.url.pathname === '/') {
    sendResponse(res, 200, "text/html", `<!DOCTYPE html>
    <html>
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
  };

  if (req.method === 'GET' && req.url.pathname === '/cowsay') {
    console.log(req.url);
    sendResponse(res, 200, "text/html", cowsay.say({text: `${req.url.query}`}));
  }
  else sendResponse(res, 200, "text/html", cowsay.cow({text:'I need somth good to say'}));

  if (req.method === 'POST' && req.url.pathname === '/') {
    let body = '';
    req.on('data', function(data) {
      body += data.toString();
    });

    req.on('end', function() {
      let json;
      try {
        json = JSON.parse(body);
      } catch(e) {
        return sendResponse(res, 400, 'bad json!');
      }
      console.log(json);
      sendResponse(res, 200, 'got the JSON');
    });
  } else {
    sendResponse(res, 400, 'bad request');
  }
});
server.listen(8000,console.log('running on', 8000));
//(cowsay.say({
// text : "I's a cow'",
// }))
