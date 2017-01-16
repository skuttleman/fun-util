require('babel-core/register');

const babel = require('gulp-babel');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const del = require('del');
const jasmine = require('gulp-jasmine');

const toFilePath = file => {
  return file.split('/src')[1].split('/');
};

const toTranspile = file => {
  let filePath = toFilePath(file);
  return `transpile:${filePath.join('/')}`;
};

const toDirectory = file => {
  let filePath = toFilePath(file).slice(0, -1);
  return filePath.join('/');
};

const testError = exit => function(err) {
  if (err.name && err.message && err.codeFrame) {
    console.error(err.name + ':', err.message);
    console.error(err.codeFrame, '\n');
  } else {
    console.log('An error occurred', err);
  }
  if (exit) process.exit(1);
  this.emit('end');
};

const test = exit => () => {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine().on('error', testError(exit)));
};

let srcFiles = String(execSync(`ls -1 ${__dirname}/src/**/*`))
  .split('\n')
  .filter(Boolean);

srcFiles.forEach(file => {
  var taskName = toTranspile(file);
  console.log('adding task:', taskName);
  gulp.task(taskName, () => gulp.src(file)
    .pipe(babel())
    .pipe(gulp.dest(`lib/${toDirectory(file)}`)));
});

gulp.task('clean', () => {
  return del('lib');
});

gulp.task('transpile:all', ['clean'], () => {
  return gulp.start(srcFiles.map(toTranspile));
});

gulp.task('test:continue', test());

gulp.task('test', test(true));

gulp.task('test:watch', ['test:continue'], () => {
  return gulp.watch(['spec/**/*.js', 'src/**/*.js'], test());
});

gulp.task('default', ['test']);
