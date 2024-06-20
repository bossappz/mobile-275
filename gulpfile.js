var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver', function() {
      gulp.src('./www')
        .pipe(webserver({
                  livereload: true,
                  host:'localhost',
                  port:8000
                }));
});
gulp.task('default', gulp.series('webserver'));
