var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('serve', function () {
    //start the server at the beginning of the task
    server.run({
        file: 'app.js'
    });
    //restart the server when file changes
    gulp.watch(['app/**/*.html'], server.notify);
    gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
});

gulp.task('default', ['serve'], function() {});