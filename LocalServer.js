var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
//var async = require('async');

// Port to be listened by the server
var port_number = server.listen(process.env.PORT || 3000);

var txts = ['send1.txt', 'send2.txt', 'send3.txt']

var server = http.createServer(function(request, response) {

  // time
  var begin = Date.now();

  var reads = [];

  var count = 0

  // console.log(request.url);
  //
  // for (var i in txts){
  //   fs.readFile(txts[i], createReady(i))
  // }

  response.end("Hello World!");

  // createReady(arg) calls this method, but NOT ready. createReady(arg)() calls both!!!!!!!!!!!! ogm, right?
  function createReady(index){
    return function ready(error, texto){
     // Send file content

     if (error){
       // internal server error
       response.code = 500;
       return response.end(error.toString())
     }

     reads[index] = (texto.toString())
     count++

     if (count >= txts.length)
      response.end(reads.join('\n'))

     var end = Date.now();

     console.log(`file${index}: ${end - begin}`)
   }
 }

}).listen(port_number); // Activates this server, listening on port 8080.

/*
obs:

1. headers['user-agent'] = headers.user-agent, but with no ambiguity in the minus sign.
2. Select text + ctrl d = select next equal

*/
