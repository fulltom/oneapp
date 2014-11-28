//TO CODE
'use strict';



var express = require('express'),
	colors = require('colors'),
	path = require('path'),
	http  = require('http'),
	app = express(),
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session'),
	morgan = require('morgan'),
	compression = require('compression'),
	server  = http.createServer(app)

	//i18n = require('i18n')
;

require('./config/_settings')(app); // MAIN APP SETTINGS

// i18n.configure({
//   // setup some locales - other locales default to en silently
//   locales: ['en', 'fr'],

//   // sets a custom cookie name to parse locale settings from
//   cookie: 'locales',

//   // where to store json files - defaults to './locales'
//   directory: __dirname + '/locales'
// });

//app.set('view cache', false);
app.set('views', __dirname + '/app/views');
app.enable('view cache');
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layout');


app.set('port', process.env.PORT || 3000);

// swig.setDefaults({cache:false});
// app.engine('html', swig.renderFile)

var publicPath = path.join(__dirname, 'app/public');
app.use(express.static(publicPath));

app.use(morgan('development' === app.get('env') ? 'dev' : 'default'));

app.use(cookieParser());
// app.use(i18n.init);



if('development' === app.get('env')){
	app.use(require('errorhandler')());
	app.locals.pretty = true;
}


app.use(function(req,res,next) {
	app.locals.url = req.url;
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
	//app.locals.layout
	next();
});

// require('./models/connection')(function(){
// 	console.log('Connection established to mongoDB');
// });
require('./app/controllers/main')(app);

server.listen(app.get('port'), function(){
	console.log('Your webapp is up on port '.green, app.get('port').toString().cyan);
});
