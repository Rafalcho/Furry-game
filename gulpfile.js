var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
          }))
        .pipe(sourcemaps.init({
            loadMaps: true
          }))
        .pipe(sass({
            errLogToConsole: true
          }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
          }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
  });

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
  });

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
      });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);
  });
