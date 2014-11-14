var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	server = require('gulp-express'),
	imagemin = require('gulp-imagemin'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
    del = require('del')
;

//Connect
gulp.task('connect', function() {
  connect.server({
    root: 'assets',
    livereload: true
  });
});
//Copy html
gulp.task('html', function () {
  gulp.src('assets/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('build'))
});


gulp.task('styles', function() {
  return gulp.src('assets/styles/*.scss')
	.pipe(sass())
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('build/css'))
});

gulp.task('scripts', function() {
  return gulp.src('assets/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

gulp.task('images', function() {
  return gulp.src('assets/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'))
});

gulp.task('watch', function() {
	gulp.watch(['assets/*.html'], ['html']);
	gulp.watch('assets/styles/*.scss', ['styles']);
	gulp.watch('assets/scripts/*.js', ['scripts']);
	gulp.watch('assets/images/*', ['images']);
});

gulp.task('clean', function(cb) {
    del(['build/*'], cb);
});

gulp.task('default', ['connect', 'html','scripts','styles', 'images', 'watch','clean'], function() {});

// // Create LiveReload server
// livereload.listen();

// gulp.watch(['dist/*']).on('change', livereload.changed);

