module.exports = function(app, tesla) {

var min_css, min_sass, min_js, cacheDir, htmlEngine, compress,
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    favicon = require('serve-favicon'),
    helpers = require('view-helpers'),
    methodOverride = require('method-override'),
    minify = require('express-minify'),
    morgan = require('morgan');
    require('colors');

  // ENABLE G-ZIP COMPRESSION
  if ( app.config.gzip === true ) {
    app.use( compression() );
  }

  // SHOW ERRORS IN DEV
  if (process.env.NODE_ENV === 'development') {
    app.set('showStackError', true);
  }

  htmlEngine = require(app.config.engines.html);

  //PRETTIFY HTML
  app.locals.pretty = app.config.prettify.html;

  // LOG CSS ENGINE
  if ( app.config.engines.css !== false ) {

    if ( app.config.middleware.css === true ) {
      tesla.log('INFO:'.blue.blue + ' using ' + app.config.engines.css + ' as css preprocessor (via middleware)');
    } else {
      tesla.log('INFO:'.blue.blue + ' using ' + app.config.engines.css + ' as css preprocessor (via gulp)');
    }
  } else {
    tesla.log('INFO:'.blue.blue + ' serving raw css (no pre-processor)');
  }

  if (app.config.middleware.css === true ) {
    if ( app.config.prettify.css === true ) {
      compress = false;
    } else {
      compress = true;
    }

  // CUSTOM SETTINGS FOR SASS
  } else if ( app.config.engines.css === 'sass' && app.config.middleware.css === true ) {

    var sass = require('node-sass');

    app.use(sass.middleware({
      src: app.config.root + '/public/',
      dest: app.config.root + '/public/',
      debug: app.config.prettify.css
    }));

  }


  // SERVE STATIC FILES
  app.use( express.static( app.config.root + '/public/') );


  // MINIFY CSS
  if ( app.config.prettify.css === false ) {
    min_css = /css/;
    min_less = /css/;
    min_sass = /css/;
    min_stylus = /css/;
  } else {
    min_css = /donothinghere/;
    min_less = /donothinghere/;
    min_sass = /donothinghere/;
    min_stylus = /donothinghere/;
  }

  // MINIFY JS
  if ( app.config.prettify.js === false ) {
    min_js = /js/;
  } else {
    min_js = /donothinghere/;
  }

  // CACHING
  if ( app.config.cache === true ) {
    cacheDir = app.config.root + '/public/_cache';
  } else {
    cacheDir = false;
  }


  app.use(minify( {
    js_match: min_js,
    css_match: min_css,
    sass_match: min_sass,
    cache: cacheDir,
    blacklist: [/\.min\.(css|js)$/],
    whitelist: null
  }));

  // FAVICON
  app.use(favicon(app.config.root + '/public/favicon.ico'));

  // LOGGER
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // SET VIEWS DIR
  app.set('views', app.config.root + '/app/views');

  // SET JSONP
  if ( app.config.jsonp === true ) {
    app.enable('jsonp callback');
  }

    // COOKIE PARSER (KEEP ABOVE SESSION)
    app.use(cookieParser());

    // SET HTML VIEW ENGINE
    app.set('view engine', 'hbs');
    app.engine('html', require('hbs').__express);
    htmlEngine.registerPartials(app.config.root + '/app/views/partials');


    tesla.log('INFO:'.blue.blue + ' using ' + app.config.engines.html + ' as view engine');

    app.use(methodOverride());

    // VIEW HELPERS
    app.use(helpers(app.name));

    // CUSTOM MIDDLEWARE
    app.use(function(req,res,next){
      res.header('X-Powered-By' , 'Bricks' );
      next();
    });

};
