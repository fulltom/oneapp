var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
  clean = require('gulp-clean'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
  del = require('del')
;

//Connect
gulp.task('connect', function() {
  connect.server({
    root: 'build',
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
  gulp.src(['assets/scss/*.scss'])
	.pipe(sass({
            outputStyle: 'extended'
     }))
	// .pipe(rename({suffix: '.min'}))
 //  .pipe(minifycss())
  .pipe(livereload())
  .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('assets/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

gulp.task('vendors', function() {
  return gulp.src('assets/bower_components/foundation/js/vendor/*.js')
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/vendors'))
});

gulp.task('images', function() {
  return gulp.src('assets/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'))
});



gulp.task('watch', function() {
  livereload.listen();
	gulp.watch(['assets/*.html'], ['html']).on('change', livereload.changed);
	gulp.watch(['assets/scss/app.scss'], ['styles']).on('change', livereload.changed);
	gulp.watch(['assets/scripts/*.js'], ['scripts']).on('change', livereload.changed);
	gulp.watch(['assets/images/*'], ['images']).on('change', livereload.changed);
  gulp.watch(['build/*.html']).on('change', livereload.changed);
});

gulp.task('default', ['connect', 'html', 'scripts', 'vendors', 'styles', 'images', 'watch'], function() {});

