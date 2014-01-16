var express = require("express"),
    swig = require("swig"),
    app = express();

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);


app.get('/', function(req, res){
   res.render('index', {title : "oneappage", content : "main"});
});

app.listen(3000);
console.log('Application Started on http://localhost:3000/');