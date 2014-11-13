var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	whitespace = require('gulp-css-whitespace'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename')
;

gulp.task('express', function () {
	var express = require("express"),
		swig = require('swig'),
		app = express()
	;
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
});


gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
	.pipe(sass())
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
	.pipe(notify({ message: 'styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('app/assets/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('app/styles/*.scss', ['styles']);
});

gulp.task('default', ['express', 'watch', 'scripts'], function() {});

