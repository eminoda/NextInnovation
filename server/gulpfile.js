const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', () => {
    gulp.src([
            './**/*.*', '!./node_modules/**', '!./dist/**',
        ])
        .pipe(zip('server.zip'))
        .pipe(gulp.dest('dist'))
})