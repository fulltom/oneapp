var path = require('path'),
rootPath = path.normalize(__dirname + '/..');

module.exports = function (app) {
  app.config = {

    cache : true, // whether to use caching

    // see https://github.com/dresende/node-orm2/wiki/Connecting-to-Database for more info on connection to your databse
    db : {
      url : 'driver://username:password@hostname/database', // url to database
      driver : 'mongodb' // which db driver to use
    },

    gzip : true, // whether to enable gzip compression

    liveReload : {
      port : 35729, // port to run the server on
    },

    logging : {
      console : true, // whether to allow tesla to log messages to the node console
      files : false // this doesn't do anything yet, eventually it will write .log files
    },

    protocol : 'http://', // options: (http|https)

    publicDir : './public/', // public directory where images, javascript, css, etc is stored

    root : rootPath, // path to the root of your server

  };

};