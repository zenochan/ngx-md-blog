var gulp = require('gulp');
var replace = require("gulp-replace");

gulp.task('build:after', function () {
  gulp.src(['dist/index.html'])
    .pipe(replace(/(href="|src=")(styles|inline|vendor|main)([^"]+")/ig, '$1http://blog.cdn.mjtown.cn/$2$3'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function () {
  gulp.src(['dist/index.html'])
    .pipe(replace(/(href="|src=")(styles|inline|vendor|main)([^"]+")/ig, '$1http://blog.cdn.mjtown.cn/$2$3'))
    .pipe(replace(/<base href=".\/">/ig, '<base href="/">'))
    .pipe(gulp.dest('dist/'));
});