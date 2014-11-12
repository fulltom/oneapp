var express = require("express"),
	exphbs  = require('express-handlebars'),
	app = express()
;

//app.use(require('connect-livereload')());
app.engine('handlebars', exphbs({defaultLayout: 'main', layout:false}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);
console.log('Application Started on http://localhost:3000/');