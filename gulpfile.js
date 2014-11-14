var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
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
  gulp.src(['assets/scss/*.scss', '!assets/scss/_variables.scss'])
	.pipe(sass({
            includePaths: ['assets/scss', 'assets/bower_components/foundation/scss'],
            outputStyle: 'expanded'
     }))
	.pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'))
    .pipe(livereload(server));
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

