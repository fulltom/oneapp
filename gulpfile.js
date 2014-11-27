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
  minifyHTML = require('gulp-minify-html'),
  del = require('del')
;

//Connect
// gulp.task('connect', function() {
//   connect.server({
//     root: 'public',
//     livereload: true,
//     port: 8080
//   });
// });

// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {
  console.log('Running gulp task "NODEMON"');
  nodemon({
    script: server.js,
    ext: 'js, ejs, hbs, jade, html, mustache, styl, less, scss',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('change', ['css']);

}); // END: NODEMON TASK

//Copy html
gulp.task('html', function () {
  gulp.src('app/assets/*.html')
    .pipe(connect.reload())
    //.pipe(minifyHTML())
    .pipe(gulp.dest('public'))
});


gulp.task('styles', function() {
  gulp.src(['app/assets/scss/*.scss'])
  .pipe(connect.reload())
	.pipe(sass())
	.pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/css'))
  .pipe(livereload())


});

gulp.task('scripts', function() {
  return gulp.src('app/assets/bower_components/bootstrap-sass-official/assets/javascripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('vendors', function() {
  return gulp.src('app/assets/js/vendors/*.js')
    .pipe(gulp.dest('app/assets/js/vendors'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('images', function() {
  return gulp.src('app/assets/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/img'))
});


gulp.task('watch', function() {
  livereload.listen();
	gulp.watch(['app/assets/*.html'], ['html']).on('change', livereload.changed);
	gulp.watch(['app/assets/scss/**/*.scss'], ['styles']).on('change', livereload.changed);
	gulp.watch(['app/assets/js/*.js'], ['scripts']).on('change', livereload.changed);
	gulp.watch(['app/assets/images/*'], ['images']).on('change', livereload.changed);
  gulp.watch(['public/*.html']).on('change', livereload.changed);
});

gulp.task('default', ['connect', 'html', 'styles', 'vendors', 'scripts', 'images', 'watch'], function() {});

