var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;

//основная цепочка

gulp.task('less', function () {
  return gulp.src('src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({stream: true}));
});

//вызов browser-sync для онлайн-слежения за изменениями в браузерах
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

//слежка изменений
gulp.task('watch', ['browser-sync', 'less'], function (){
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

//определяем какие задачи будут исполнятся по-умолчанию(вызов gulp)
gulp.task('default', ['watch']);
