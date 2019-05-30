"use strict";

// Load plugins
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");


// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));

  return merge(bootstrap);
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'));
}

// Define complex tasks
const vendor = gulp.series(clean, modules);

// Export tasks
exports.vendor = vendor;
exports.default = vendor;
