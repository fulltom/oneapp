//TO CODE
'use strict';

var express = require('express'),
	colors = require('colors'),
	path = require('path'),
	bodyParser = require('body-parser'),
	http  = require('http'),
	app = express(),
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session'),
	morgan = require('morgan'),
	server  = http.createServer(app)
	//i18n = require('i18n')
;

// i18n.configure({
//   // setup some locales - other locales default to en silently
//   locales: ['en', 'fr'],

//   // sets a custom cookie name to parse locale settings from
//   cookie: 'locales',

//   // where to store json files - defaults to './locales'
//   directory: __dirname + '/locales'
// });


app.set('port', process.env.PORT || 3000);

app.use(morgan('development' === app.get('env') ? 'dev' : 'default'));
app.use(cookieParser());
// app.use(i18n.init);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

if('development' === app.get('env')){
	app.use(require('errorhandler')());
	app.locals.pretty = true;
}

app.use(function(req,res,next) {
	app.locals.url = req.url;
	next();
});

// require('./models/connection')(function(){
// 	console.log('Connection established to mongoDB');
// });
require('./controllers/main')(app);

server.listen(app.get('port'), function(){
	console.log('Your webapp is up on port '.green, app.get('port').toString().cyan);
});
