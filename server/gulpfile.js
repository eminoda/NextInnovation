const gulp = require('gulp');
const zip = require('gulp-zip');
const markdown = require('gulp-markdown');

gulp.task('zip', () => {
    return gulp.src([
            './**/*.*', '!./node_modules/**', '!./dist/**',
        ])
        .pipe(zip('server.zip'))
        .pipe(gulp.dest('dist'))
})

gulp.task('markdown', () => {
    return gulp.src([
            './blogs/*.md'
        ])
        // https://github.com/chjj/marked#options-1
        .pipe(markdown())
        .pipe(gulp.dest('md_templates'))
})