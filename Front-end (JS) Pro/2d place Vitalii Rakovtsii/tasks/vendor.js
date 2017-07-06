let gulp = require('gulp');
let connect = require('gulp-connect');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

const VENDOR_LIST = [
	'node_modules/zone.js/dist/zone.min.js',
	'node_modules/reflect-metadata/Reflect.js',
	'node_modules/systemjs/dist/system.js'
];

const DYNAMIC_VENDOR_LIST = [
	'node_modules/@angular/*/bundles/*.js',
	'node_modules/rxjs/**/*.js',
	'node_modules/tslib/tslib.js',
	'node_modules/moment/min/moment.min.js',
	'node_modules/marked/lib/marked.js',
	'node_modules/ics-js/dist/ics-js.js'
];

/**
 * Copies vendors that are being required in runtime.
 */
gulp.task('vendor:dynamic', () => {
	return gulp.src(DYNAMIC_VENDOR_LIST, { base: 'node_modules' })
		.pipe(gulp.dest('build/vendor'))
		.pipe(connect.reload());
});

/**
 * Copies vendors that are statically linked in html page.
 */
gulp.task('vendor:static', () => {
	return gulp.src(VENDOR_LIST, { base: 'node_modules' })
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/bundle'))
		.pipe(connect.reload());
});


gulp.task('vendor', ['vendor:static', 'vendor:dynamic']);
