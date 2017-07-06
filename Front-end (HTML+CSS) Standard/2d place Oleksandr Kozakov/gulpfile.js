var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

// Convert sass syntax to css
gulp.task("sass", function() {
    gulp.src("css/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle : "expanded"
		}).on('error', sass.logError))
		.pipe(sourcemaps.write("./", {
			addComment : false,
			mapFile : "style.css.map"
		}))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream({match: "**/*.css"}));
});

// Auto reload browser after change files
gulp.task("default", function(){
	browserSync.init({
        server : true
	});

	gulp.watch("css/*.scss", ["sass"]);
	gulp.watch(["*.html", "js/*.js"]).on("change", browserSync.reload);
});
