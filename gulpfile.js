'use strict';

var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  del = require('del'),
  $ = require('gulp-load-plugins')({
    lazy: true
  });

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

// Runs the dev server
gulp.task('dev-server', ['watch'], function() {
  $.connect.server({
    root: 'dev',
    livereload: true
  });
});

// Default watch task for CSS and JS files.
gulp.task('watch', ['js-watcher', 'html-watcher', 'css-watcher'], function() {
  log('Watching for changes in HTML, CSS and JS files');
});

// Watches for changes in JS files.
gulp.task('js-watcher', function() {
  gulp.watch('./dev/js/*.js', ['reload']);
});

// Watches for changes in HTML files.
gulp.task('html-watcher', function() {
  gulp.watch('./dev/*.html', ['reload']);
});

// Watches for changes in CSS files.
gulp.task('css-watcher', function() {
  gulp.watch('./dev/css/styles.css', ['reload']);
});

// Reloads index.html on HTML, CSS or JS files changes
gulp.task('reload', function() {
  return gulp
    .src('./dev/*.html')
    .pipe($.connect.reload());
});

// Runs the prod server
gulp.task('build', ['clean', 'buildHTML', 'buildCSS', 'buildJS', 'copyFiles'], function() {});

// Minifies HTML
gulp.task('buildHTML', function() {
  return gulp
    // Selects the HTML files to use.
    .src('./dev/*.html')
    // Minifies HTML files.
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    // Saves minified files.
    .pipe(gulp.dest('./prod/'));
});

// Minifies CSS
gulp.task('buildCSS', function() {
  return gulp
    // Selects the CSS file to use.
    .src('./dev/css/styles.css')
    // Minifies CSS file.
    .pipe($.csso())
    // Saves minified files.
    .pipe(gulp.dest('./prod/css'));
});

// Minifies JS
gulp.task('buildJS', function() {
  return gulp
    // Selects the JS files to use.
    .src('./dev/js/*.js')
    // Minifies JS files.
    .pipe($.uglify())
    // Saves minified files.
    .pipe(gulp.dest('./prod/js'));
});

// Copy needed files to prod
gulp.task('copyFiles', function() {
  return gulp
    .src(['dev/audio/**/*', '!dev/css/styles.css', 'dev/css/**/*', 'dev/images/**/*', 'dev/js/vendors/**/*'], {
      base: 'dev'
    })
    .pipe(gulp.dest('prod'));
});

// Deletes files.
gulp.task('clean', function(done) {
  clean('prod', done);
});