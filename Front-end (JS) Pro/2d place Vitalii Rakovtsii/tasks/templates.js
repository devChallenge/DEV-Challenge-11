let gulp = require('gulp');
let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let del = require('del');
let moment = require('moment');

const TEMPLATE_SRC_GLOB = 'app/**/*.pug';
const TEMPLATE_OUT_DIR = 'build';

/**
 * Compiles templates.
 */
gulp.task('templates', ['templates:clear'], () => {
	return gulp.src(TEMPLATE_SRC_GLOB, { base: '.' })
		.pipe(plumber())
		.pipe(pug({
			pretty: true,
			locals: { moment }
		}))
		.pipe(gulp.dest(TEMPLATE_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('templates:watch', () => gulp.watch(TEMPLATE_SRC_GLOB, ['templates']));

gulp.task('templates:clear', () => {
	return del([`${TEMPLATE_OUT_DIR}/**/*.html`]);
});
