'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
sass.compiler = require('sass');

gulp.task('css', function () {
  return gulp
    .src('./styles/sass/*.scss')
    .pipe(sass())
    .on('error', sass.logError) //log errors
    .pipe(gulp.dest('./styles/css'))
})

gulp.task('img', function () {
  return gulp
    .src('./img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./_site/img'))
})

gulp.task('watch', function () {
  gulp.watch('./styles/sass/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css', 'img'))