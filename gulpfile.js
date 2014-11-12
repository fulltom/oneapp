var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	server = require('gulp-express');

gulp.task('css', function(){
	gulp.src('app/styles/main.css')
	.pipe(minifycss())
	.pipe(gulp.dest('./dist/css'));
}

gulp.task('serve', function () {
    server.run({
        file: 'app.js'
    });
    gulp.watch(['app/styles/*.css'], ['css'], server.notify);
});

gulp.task('default', ['serve'], function() {});