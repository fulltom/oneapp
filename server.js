//TO CODE
'use strict';
var tesla,
    express = require('express'), // GET EXPRESS
    app = module.exports = express(), // DEFINE THE APP
    server = require('http').createServer(app); // CREATE THE SERVER
    require('colors'); // PRETTY CONSOLE LOGGING
    require('fs'); // FILE SYSTEM
    process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // SET DEFAULT ENVIRONMENT

// LOAD CONFIG & TESLA CLASS
require('./config/_settings')(app); // MAIN APP SETTINGS
tesla = require('./lib/tesla')(app);
tesla.inform(app, 'start'); // WELCOME MESSAGE

// REQUIRED SETTINGS & CONFIG FILES
require('./config/environment/' + process.env.NODE_ENV)(app); // ENVIRONMENT SPECIFIC SETTINGS
require('./config/express')(app, tesla); // EXPRESS SETTINGS
require('./app/routes/default')(app, tesla); // DEFAULT ROUTES


// ADD SOCKET.IO
if ( app.config.socket === true ) {
  app.io = require('socket.io').listen(server);
}

// START THE APP BY LISTEN ON <PORT>
server.listen( process.env.PORT || app.config.port, function( err ) {

  if ( !err ) { // IF THERE'S NO ERRORS
    tesla.inform(app, 'done');
  } else { // OH NOES! SOMETHING WENT WRONG!
    tesla.inform(app, 'error', err);
  }

});

// HANDLE UNCAUGHT ERRORS
process.on('uncaughtException', function(err) {

  if(err.errno === 'EADDRINUSE') {
    tesla.inform(app, 'eaddr');
  } else {
    tesla.inform(app, 'error', err);
  }

  process.exit(1);

});

// EXPOSE APP
exports = module.exports = app;

// var express = require('express'),
// 	colors = require('colors'),
// 	path = require('path'),
// 	http  = require('http'),
// 	app = express(),
// 	cookieParser = require('cookie-parser'),
// 	cookieSession = require('cookie-session'),
// 	morgan = require('morgan'),
// 	compression = require('compression'),
// 	server  = http.createServer(app)

// 	//i18n = require('i18n')
// ;

// require('./config/_settings')(app); // MAIN APP SETTINGS

// // i18n.configure({
// //   // setup some locales - other locales default to en silently
// //   locales: ['en', 'fr'],

// //   // sets a custom cookie name to parse locale settings from
// //   cookie: 'locales',

// //   // where to store json files - defaults to './locales'
// //   directory: __dirname + '/locales'
// // });

// //app.set('view cache', false);
// app.set('views', __dirname + '/app/views');
// app.enable('view cache');
// app.engine('html', require('hogan-express'));
// app.set('view engine', 'html');
// app.set('layout', 'layout');


// app.set('port', process.env.PORT || 3000);

// // swig.setDefaults({cache:false});
// // app.engine('html', swig.renderFile)

// var publicPath = path.join(__dirname, 'app/public');
// app.use(express.static(publicPath));

// app.use(morgan('development' === app.get('env') ? 'dev' : 'default'));

// app.use(cookieParser());
// // app.use(i18n.init);



// if('development' === app.get('env')){
// 	app.use(require('errorhandler')());
// 	app.locals.pretty = true;
// }


// app.use(function(req,res,next) {
// 	app.locals.url = req.url;
// 	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
// 	//app.locals.layout
// 	next();
// });

// // require('./models/connection')(function(){
// // 	console.log('Connection established to mongoDB');
// // });
// require('./app/controllers/main')(app);

// server.listen(app.get('port'), function(){
// 	console.log('Your webapp is up on port '.green, app.get('port').toString().cyan);
// });
