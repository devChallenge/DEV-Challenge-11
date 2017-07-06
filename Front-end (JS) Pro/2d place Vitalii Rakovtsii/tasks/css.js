let gulp = require('gulp');
let stylus = require('gulp-stylus');
let connect = require('gulp-connect');
let postcss = require('gulp-postcss');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let del = require('del');
let autoprefixer = require('autoprefixer');

const STYLUS_SRC_GLOB = 'assets/styles/**/*.styl';
const STYLUS_OUT_DIR = 'build/css';
const STYLUS_AUTOPREFIXER = { browsers: ['last 2 versions'] };

/**
 * Compiles each styl file and places it in css dir.
 */
gulp.task('css', ['css:clear'], () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			pretty: true
		}))
		.pipe(postcss([
			autoprefixer(STYLUS_AUTOPREFIXER)
		]))
		.pipe(gulp.dest(STYLUS_OUT_DIR))
		.pipe(connect.reload());
});

/**
 * Compiles each styl file into one build.main.css and places it in css dir.
 * Inlines all the images via base64 data URI.
 */
gulp.task('css:prod', ['css:clear'], () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			compress: true,
			rawDefine: {
				url: stylus.stylus.url({
					limit: false
				})
			}
		}))
		.pipe(postcss([
			autoprefixer(STYLUS_AUTOPREFIXER)
		]))
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest(STYLUS_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('css:watch', () => gulp.watch(STYLUS_SRC_GLOB, ['css']));

gulp.task('css:clear', () => {
	return del([STYLUS_OUT_DIR]);
});
