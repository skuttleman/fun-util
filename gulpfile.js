require('babel-core/register');

const babel = require('gulp-babel');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

const toFilePath = file => {
  return file.split('/src')[1].split('/');
};

const toFile = file => {
  let filePath = toFilePath(file);
  return `transpile:${filePath.join('/')}`;
};

const toDirectory = file => {
  let filePath = toFilePath(file).slice(0, -1);
  return filePath.join('/');
};

const test = exit => () => {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine().on('error', function() {
      this.emit('end');
      if (exit) process.exit(1);
    }));
};

let srcFiles = String(execSync(`ls -1 ${__dirname}/src/**/*`))
  .split('\n')
  .filter(Boolean);

srcFiles.forEach(file => {
  var filePath = toFile(file);
  console.log('adding task:', filePath);
  gulp.task(filePath, () => gulp.src(file)
    .pipe(babel())
    .pipe(gulp.dest(`lib/${toDirectory(file)}`)));
});

gulp.task('transpile', srcFiles.map(toFile));

gulp.task('test:continue', test());

gulp.task('test', test(true));

gulp.task('test:watch', ['test:continue'], () => {
  return gulp.watch(['spec/**/*.js', 'src/**/*.js'], test());
});

gulp.task('default', ['test']);
