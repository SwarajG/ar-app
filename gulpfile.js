const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssNano = require('gulp-cssnano');
const del = require('del');
const rev = require('gulp-rev');
const isDevelopment = process.env.NODE_ENV !== 'production';

gulp.task('styles', async () => {
  return gulp
    .src(['./public/dashboard/index.scss', './public/product/css/index.scss'], {
      base: 'public',
    })
    .pipe(rev())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('public/assets/css'))
    .pipe(
      rev.manifest('public/assets/rev-manifest.json', {
        base: 'public/assets/css',
        merge: true,
      })
    )
    .pipe(gulp.dest('public/assets'));
});

gulp.task('clean', () => {
  return del(['./public/assets/css/**/*.css']);
});

gulp.task('watch', () => {
  gulp.watch('./public/**/*.scss', (done) => {
    gulp.series(['clean', 'styles'])(done);
  });
});

const taskList = ['clean', 'styles'];
if (isDevelopment) {
  taskList.push('watch');
}
gulp.task('default', gulp.series(taskList));
