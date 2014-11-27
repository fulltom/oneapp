module.exports = function mainController(app){
	app.get('/', function index(req,res){
		res.render('index');
	});
	app.use(function(req, res) {
     	res.status(400);
     	//4es.render('404.jade', {title: '404: File Not Found'});
  });
};