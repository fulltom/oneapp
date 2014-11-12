var express = require("express"),
	swig = require('swig'),
	app = express()
;

//app.use(require('connect-livereload')());
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', {
    	title: 'Consolidate.js'
  });
});

app.listen(3000);
console.log('Application Started on http://localhost:3000/');