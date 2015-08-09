var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var notify = require('gulp-notify');

var sourcesDir = './app';
var appEntryPoint = "main.js";
var targetDir = './public/';


gulp.task('watch', function() {
  gulp.watch(sourcesDir + '/' + "*.js", ['default']);
});

/*
  Scripts
 */              

gulp.task('scripts', function() {
  return browserify({entries: [sourcesDir + '/' + appEntryPoint], debug: true})
    .transform(reactify)
    .bundle()
    .pipe(source(appEntryPoint))
    .pipe(gulp.dest(targetDir))
    .pipe(notify("Bundling done."));
});

/*
  Styles
 */

gulp.task('styles', function () {
  gulp.src( './client/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

/*
  Development
 */

gulp.task('watch', function () {
  gulp.watch('./client/styles/*.scss', ['sass']);
  gulp.watch('app/**/*.jsx', ['scripts']);
  gulp.watch('app/**/*.js', ['scripts']);
  gulp.watch('app/main.js', ['scripts']);
});

gulp.task('start:development', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html jsx',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('start:production', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html jsx',
  })
});

gulp.task('default', ['scripts', 'styles']);
gulp.task('develop', ['scripts', 'styles', 'watch', 'start:development']);
gulp.task('production', ['scripts', 'styles', 'start:production']);

gulp.task('heroku:production', ['scripts', 'styles']);