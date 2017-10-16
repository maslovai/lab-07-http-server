'use strict';
let text = '';
let bodyParser = module.exports = {};
bodyParser.run = function(req) {
  return new Promise((resolve, reject)=>{
  let text = '';
   req.on('data', function(data) {
     text += data.toString();
    //  console.log(text);
   });
   req.on('end', function() {
     let json;
     try {
       json = JSON.parse(text);
      //  console.log('json:', json);
       resolve(json);
     } catch(error) {
       reject(error);
     }
   });
 });
}
