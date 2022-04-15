const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concatCss = require('gulp-concat-css');
const cssNano = require('gulp-cssnano');
const del = require('del');
const rev = require('gulp-rev');
const isDevelopment = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => {
  return gulp
    .src(['./public/dashboard/index.scss', './public/product/css/index.scss'], {
      base: './public/assets',
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('clean', () => {
  return del(['./public/assets/css/**/*.css']);
});

gulp.task('minify', function minifyFunc() {
  return gulp
    .src('public/assets/**/*.css')
    .pipe(rev())
    .pipe(cssNano())
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(
      rev.manifest('public/assets/css/rev-manifest1.json', {
        base: 'public/assets/css',
        merge: true,
      })
    );
});

gulp.task('watch', () => {
  gulp.watch('./public/**/*.scss', (done) => {
    gulp.series(['clean', 'styles', 'minify'])(done);
  });
});

const taskList = ['clean', 'styles', 'minify'];
if (isDevelopment) {
  taskList.push('watch');
}
gulp.task('default', gulp.series(taskList));
