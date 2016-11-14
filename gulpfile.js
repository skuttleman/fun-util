require('babel-core/register');

const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', () => {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine().on('error', function() {
      this.emit('end');
    }));
});

gulp.task('test:watch', ['test'], () => {
  return gulp.watch(['spec/**/*.js', 'src/**/*.js'], ['test']);
});

gulp.task('default', ['test']);
