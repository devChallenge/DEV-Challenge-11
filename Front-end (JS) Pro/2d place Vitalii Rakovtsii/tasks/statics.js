let gulp = require('gulp');
let connect = require('gulp-connect');
let del = require('del');

const STATICS_SRC_GLOB = 'assets/statics/**/*';
const STATICS_OUT_DIR = 'build/statics';

/**
 * Copies all statics to statics dir.
 */
gulp.task('statics', ['statics:clear'], () => {
	return gulp.src(STATICS_SRC_GLOB)
		.pipe(gulp.dest(STATICS_OUT_DIR))
		.pipe(connect.reload());
});

gulp.task('statics:watch', () => gulp.watch(STATICS_SRC_GLOB, ['statics']));

gulp.task('statics:clear', () => {
	return del([STATICS_OUT_DIR]);
});
