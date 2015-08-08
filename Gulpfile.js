var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');


//                     _       __
//     _______________(_)___  / /______
//    / ___/ ___/ ___/ / __ \/ __/ ___/
//   (__  ) /__/ /  / / /_/ / /_(__  )
//  /____/\___/_/  /_/ .___/\__/____/
//                  /_/

gulp.task('scripts:develop', function () {
  gulp.src(['app/main.js'])
  .pipe(browserify({
    debug: true,
    transform: ['reactify']
  }))
  .pipe(gulp.dest('./public/'));
});

gulp.task('scripts:production', function () {
  gulp.src(['app/main.js'])
  .pipe(browserify({
    debug: false,
    transform: ['reactify']
  }))
  .pipe(gulp.dest('./public/'));
});

//          __        __
//    _____/ /___  __/ /__  _____
//   / ___/ __/ / / / / _ \/ ___/
//  (__  ) /_/ /_/ / /  __(__  )
// /____/\__/\__, /_/\___/____/
//          /____/

gulp.task('styles', function () {
  gulp.src( './client/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

//        __          __                                 __
//   ____/ /__ _   __/ /___  ____  ____ ___  ___  ____  / /_
//  / __  / _ \ | / / / __ \/ __ \/ __ `__ \/ _ \/ __ \/ __/
// / /_/ /  __/ |/ / / /_/ / /_/ / / / / / /  __/ / / / /_
// \__,_/\___/|___/_/\____/ .___/_/ /_/ /_/\___/_/ /_/\__/
//                       /_/

gulp.task('watch', function () {
  gulp.watch('./client/styles/*.scss', ['sass']);
  gulp.watch('app/main.js', ['scripts:develop']);
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html jsx',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['scripts:production', 'styles']);
gulp.task('develop', ['scripts:develop', 'styles', 'watch', 'start']);
gulp.task('prod', ['scripts:production', 'styles']);

gulp.task('heroku:production', ['scripts:production', 'styles']);