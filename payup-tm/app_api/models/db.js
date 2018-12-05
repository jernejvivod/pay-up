var mongoose = require('mongoose');

// link za mLab bazo:
// var dbURI = 'mongodb://payup:payup123@ds123844.mlab.com:23844/payup-tm';

// Dodamo povezavo na lokalno bazo.
var dbURI = 'mongodb://localhost/mongodb';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MLAB_URI;
} 

/*--------------------------------------------------*/
//               Koda kopirana iz vaj.              //    
/*--------------------------------------------------*/

if(process.env.DB_URI){
  dbURI = process.env.DB_URI;
}

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose error at connection: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection has been terminated.');
});

var runOK = function(message, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose has been closed on ' + message);
    callback();
  });
};

// Re-run with nodemon
process.once('SIGUSR2', function() {
  runOK('nodemon re-run', function() {
    process.exit(0);
    //process.kill(process.pid, 'SIGUSR2');
    //process.exit(); 
  });
});

// Close
process.on('SIGINT', function() {
  runOK('close SIGINT', function() {
    process.exit(0);
  });
});

// Close on Heroku
process.on('SIGTERM', function() {
  runOK('close on Heroku', function() {
    process.exit(0);
  });
});

// Dodamo shemo za bazo
require("./loans")