var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var mongoose = require('mongoose');
//var async = require('async');

// Port to be listened by the server
var port_number = process.env.PORT || 3000;

// Let's code

// Connecting to mongoDB database using mongoose
//mongodb://webhacker:webhackerufabc@ds139675.mlab.com:39675/webhackerdb
// console.log('Trying to connect with: ' + process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected succesfully to mongodb uri: ' + process.env.MONGOLAB_URI);
});

// Acessing Person from model file
var Person = require('/app/MongooseModels/Person');

var Iha = new Person({
  name: 'Gustavo Iha',
  nickname: 'Iha',
  age: 20,
  birthPlace: 'São Paulo',
  height: 1.80,
  weight: 60.0
});

Iha.save(function(error){
  console.log((!error) ? 'Person has been saved!' : error.toString());
});

var server = http.createServer(function(request, response) {

  filePath = request.url;

  console.log(filePath);

  serverWorking(response, filePath);

}).listen(port_number); // Activates this server, listening on port 8080.


function serverWorking(response, filePath){

  // If there's no additional url after .com, return default page.
  if (filePath == '/')
    return defaultPage(response);

  // Add /app to filePath so Server can find correct files.
  filePath = "/app" + filePath;

  fs.exists(filePath, function(exists) {
    if (exists){

      fs.readFile(filePath, function(error, data){
        if (error){
          // internal server error
          response.code = 500;
          return response.end(error.toString())
        }

        response.end(data.toString());

      });

    }
    else{
      response.writeHead(404, {"Content-type" : "text/plain"});
      response.write("Error 404: resource not found");
      response.end();
    }
  });
};

function defaultPage(response){
  // Default page here
  response.end('Briefly there\'ll be something awesome in here...');
}
