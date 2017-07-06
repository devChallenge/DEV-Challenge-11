let gulp = require('gulp');
let del = require('del');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');

require('./tasks/css');
require('./tasks/app');
require('./tasks/templates');
require('./tasks/styles');
require('./tasks/vendor');
require('./tasks/statics');
require('./tasks/pages');
require('./tasks/connect');
require('./tasks/clean');
require('./tasks/tslint');

gulp.task('compile', ['statics', 'app', 'worker', 'templates', 'styles', 'css', 'pages']);
gulp.task('compile:prod', ['statics', 'pages:prod']);

gulp.task('watch', ['css:watch', 'templates:watch', 'css:watch', 'styles:watch', 'app:watch', 'pages:watch', 'statics:watch']);

gulp.task('dev:prod', ['clean'], () => {
	gulp.run(['vendor', 'compile:prod', 'connect']);
});

gulp.task('dev', ['clean'], () => {
	gulp.run(['vendor', 'compile', 'connect', 'watch']);
});

gulp.task('default', ['dev']);
