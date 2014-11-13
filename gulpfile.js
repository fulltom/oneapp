var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	inject = require('gulp-inject'),
	livereload = require('gulp-livereload'),
    del = require('del');
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
});

gulp.task('scripts', function() {
  return gulp.src('app/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// gulp.task('images', function() {
//   return gulp.src('app/images/*')
//     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('dist/img'))
// });

gulp.task('watch', function() {
  gulp.watch('app/styles/*.scss', ['styles']);
  gulp.watch('app/scripts/*.js', ['scripts']);
  gulp.watch('app/images/*', ['images']);
});

gulp.task('clean', function(cb) {
    del(['dist/*'], cb);	
});

gulp.task('default', ['express','clean','scripts','styles', 'watch'], function() {});

// Create LiveReload server
livereload.listen();

gulp.watch(['dist/*']).on('change', livereload.changed);

