let gulp = require('gulp');
let tslint = require('gulp-tslint');
let plumber = require('gulp-plumber');

const TEST_SRC_GLOB = 'test/**/*.ts';
const APP_SRC_GLOB = 'app/**/*.ts';

const TSLINT_OPTIONS = {
	formatter: 'verbose'
};

gulp.task('tslint:app', () => {
	return gulp.src([APP_SRC_GLOB])
		.pipe(plumber())
		.pipe(tslint(TSLINT_OPTIONS))
		.pipe(tslint.report());
});

gulp.task('tslint:test', () => {
	return gulp.src([TEST_SRC_GLOB])
		.pipe(plumber())
		.pipe(tslint(TSLINT_OPTIONS))
		.pipe(tslint.report());
});

gulp.task('tslint', ['tslint:app', 'tslint:test']);
