'use strict'

let gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    cleanCss = require('gulp-clean-css')


gulp.task('transpile', () => {
  return gulp.src('frontend/src/**/*.js')
             .pipe(plumber())
             .pipe(sourceMaps.init())
             .pipe(babel({ presets: ['latest'] }))
             .pipe(concat('scripts.js'))
             .pipe(sourceMaps.write('./maps'))
             .pipe(gulp.dest('./frontend/build'))
})

gulp.task('sass', () => {
  return gulp.src('frontend/styles/styles.scss')
             .pipe(plumber())
             .pipe(sourceMaps.init())
             .pipe(sass())
             .pipe(cleanCss())
             .pipe(sourceMaps.write('./maps'))
             .pipe(gulp.dest('./frontend/build'))
})

gulp.task('watch', () => {
  gulp.watch('frontend/src/**/*.js', ['transpile'])
  gulp.watch('frontend/src/**/*.scss', ['sass'])
})

gulp.task('default', ['sass', 'transpile', 'watch'])
gulp.task('build', ['sass', 'transpile'])
