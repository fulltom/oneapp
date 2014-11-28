exports.index = function(app) {

	app.res.render('index', {
		pretty: false,
		title : app.site.name,
		site: app.site
    });

};