'use strict';

const gulp = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const minify = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(rename('main.bundle.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function () {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
});
