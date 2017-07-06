(function (global) {
	let map = {
		'app': 'build/app',
		'@angular': 'build/vendor/@angular',
		'rxjs': 'build/vendor/rxjs',
		'moment': 'build/vendor/moment/min/moment.min.js',
		'marked': 'build/vendor/marked/lib/marked.js',
		'tslib': 'build/vendor/tslib/tslib.js',
		'ics-js': 'build/vendor/ics-js/dist/ics-js.js'
	};

	let packages = {
		'app': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		}
	};

	let ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade',
	];

	ngPackageNames.forEach(function (pkgName) {
		packages['@angular/' + pkgName] = {
			main: System.packageWithIndex ? 'index.js' : 'bundles/' + pkgName + '.umd.js',
			defaultExtension: 'js'
		};
	});

	System.config({
		map: map,
		packages: packages
	});
})(this);
