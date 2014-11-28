var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	minifycss = require('gulp-minify-css'),
  minifyhtml = require('gulp-minify-html'),
	rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  del = require('del')
;


// MONITOR SERVER FOR CHANGES & RESTART
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js, html, scss',
    ignore: ['README.md', 'node_modules/**', '.DS_Store']
  })
  .on('change', ['watch','html' ]);
});
// END: NODEMON TASK

// gulp.task('build', function() {
//   lrserver.listen(35729);
// });

gulp.task('html', function () {
    gulp.src('app/views/layout.html')
    .pipe(minifyhtml())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('public'))
    .pipe(livereload())
});


gulp.task('styles', function() {
  gulp.src(['app/assets/scss/*.scss'])
	.pipe(sass())
	.pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/css'))
  .pipe(livereload())
});

gulp.task('scripts', function() {
    gulp.src('app/assets/bower_components/bootstrap-sass-official/assets/javascripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('vendors', function() {
    gulp.src('app/assets/js/vendors/*.js')
    .pipe(gulp.dest('app/assets/js/vendors'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

gulp.task('images', function() {
    gulp.src('app/assets/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/img'))
});



gulp.task('watch', function() {
  livereload.listen();
  //gulp.watch(['app/assets/views/index.html'], ['html']).on('change', livereload.changed);
	gulp.watch(['app/assets/scss/**/*.scss'], ['styles']).on('change', livereload.changed);
	gulp.watch(['app/assets/js/*.js'], ['scripts']).on('change', livereload.changed);
	gulp.watch(['app/assets/images/*'], ['images']).on('change', livereload.changed);
});

gulp.task('default', ['nodemon', 'styles', 'vendors', 'scripts', 'images' ,'watch'], function() {});
//gulp.task('default', ['connect', 'html', 'styles', 'vendors', 'scripts', 'images', 'watch'], function() {});







