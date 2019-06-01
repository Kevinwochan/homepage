"use strict";

// Load plugins
const del = require("del");
const gulp = require("gulp");
const concat = require("gulp-concat");
const count = require("gulp-count");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

// Clean files
function clean() {
  return del([
    "css/.*min.css",
    "js/.*min.js"
  ]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src("./node_modules/bootstrap/dist/**/*")
    .pipe(gulp.dest("./vendor/bootstrap"));
  return bootstrap;
}

// CSS task
function css() {
  return gulp.src([
      "vendor/bootstrap/css/bootstrap.min.css",
      "css/styles.css"
    ])
    .pipe(concat("styles.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'));
}

// JS task
function js() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'));
}

// Watch files
function watchFiles() {
  gulp.watch("./css/*", css);
  gulp.watch("./js/*", js);
}


// Define complex tasks
const vendor = gulp.series(clean, modules, css);
const build = gulp.series(clean, css, js);

// Export tasks
exports.vendor = vendor;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;
