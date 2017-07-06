const gulp = require('gulp'),
      gulpif = require('gulp-if'),
      filter = require('gulp-filter'),
      pugInheritance = require('yellfy-pug-inheritance'),
      pug = require('gulp-pug'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      replace = require('gulp-replace'),
      uglify = require('gulp-uglify'),
      rigger = require('gulp-rigger'),
      imagemin = require('gulp-imagemin'),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      connect = require('gulp-connect'),
      debug = require('gulp-debug'),
      newer = require('gulp-newer'),
      remember = require('gulp-remember'),
      environments = require('gulp-environments'),
      svgmin = require('gulp-svgmin'),
      svgstore = require('gulp-svgstore'),
      browserSync = require('browser-sync').create(),
      removeEmptyLines = require('gulp-remove-empty-lines'),
      postcss = require('gulp-postcss'),
      assets = require('postcss-assets'),
      postcssfor = require('postcss-for'),
      sprites = require('postcss-sprites'),
      cssnext = require('postcss-cssnext'),
      postcssEmpty = require('postcss-discard-empty'),
      cssnano = require('cssnano'),
      rimraf = require('rimraf'),
      postcssShort = require('postcss-short'),
      rucksack = require('rucksack-css'),
      sugarss = require('sugarss'),
      notify = require('gulp-notify'),
      utilities = require('postcss-utilities'),
      mainPath = require('path'),
      postcssImport = require('postcss-import'),
      functions = require('postcss-functions');

let development = environments.development,
    production = environments.production;

let path = {
  dev: {
    htmlDir : production() ? 'prod/' : 'dev/',
    jsDir   : production() ? 'prod/js/' : 'dev/assets/js/',
    js  : production() ? 'prod/js/main.js' : 'dev/assets/js/main.js',
    cssDir  : production() ? 'prod/css/' : 'dev/assets/css/',
    css  : production() ? 'prod/css/main.css' : 'dev/assets/css/main.css',
    imgDir  : production() ? 'prod/img/' : 'dev/assets/img/',
    fontDir : production() ? 'prod/fonts/' : 'dev/assets/fonts/',
    libsDir : production() ? 'prod/libs/' : 'dev/assets/libs/'
  },
  src: {
    jsModules : 'src/modules/**/*.js',
    jsLibs : production() ? 'dev/assets/libs/**/*.js' : 'src/assets/libs/**/*.js',
    img       : production() ? 'src/assets/img/*.*' : 'src/assets/img/**/*.*',
    svg       : production() ? 'src/assets/img/svg/*.svg' : 'src/assets/img/svg/*.svg',
    cssAll    : production() ? 'dev/assets/css/main.css' : ['src/assets/css/global.sss',
                'src/assets/css/fonts.sss',
                'src/assets/css/grid.sss',
                'src/modules/**/*.sss'
                ],
    cssLibs : production() ? 'dev/assets/libs/**/*.css' : 'src/assets/libs/**/*.sss',
    font      : 'src/assets/fonts/*.*',
    fileFirst : ['img/',
                'img/sprites/',
                'fonts/'
                ]
  },
  watch: {
    html : 'src/templates/**/*.pug',
    js   : ['src/assets/js/*.js', 'src/modules/**/*.js'],
    css  : ['src/assets/css/*.sss', 'src/modules/**/*.sss'],
    img  : 'src/assets/img/**/*.*',
    font : 'src/assets/fonts/*.*',
    cssLibs : 'src/assets/libs/**/*.sss',
    jsLibs : 'src/assets/libs/**/*.js'
  },
  clean: {
    dev  : './dev',
    prod : './prod'
  }
};

const postCssFunctions = functions({
  functions: {
    em: function(pixels, browserContext = 16) {
      return `${pixels / browserContext}em`;
    }
  }
});

let processors_dev = [
  postcssfor,
  assets({
    loadPaths: path.src.fileFirst,
    relative: 'css/',
    basePath: 'src/assets/'
  }),
  rucksack({
    alias: false,
    easings: false,
    inputPseudo: false,
    quantityQueries: false,
    responsiveType: false
  }),
  postCssFunctions,
  postcssShort,
  cssnext,
  postcssEmpty,
  utilities
];

let processors_prod = [
  sprites({
    stylesheetPath : 'prod/css',
    spritePath : 'prod/img/',
    filterBy: function(image) {
      if (!/(sprites)/.test(image.url)) {
        return Promise.reject();
      }
      return Promise.resolve();
    }
  }),
  cssnext({
    autoprefixer: {browsers:['> 0.5%','ie 8','ie 9']}
  }),
  cssnano({
    autoprefixer:false
  }),
];

/*----------- HTML -----------*/
let pugInheritanceCache = {};

const pugDirectory = 'src/templates';

function pugFilter(file, inheritance) {
  const filepath = `${pugDirectory}/${file.relative}`;
  if (inheritance.checkDependency(filepath, global.changedTempalteFile)) {
    console.log(`Compiling: ${filepath}`);
    return true;
  }
  return false;
}

gulp.task('html', function() {
  return new Promise((resolve, reject) => {
    const changedFile = global.changedTempalteFile;
    const options = {
      changedFile,
      treeCache: pugInheritanceCache
    };

    pugInheritance.updateTree(pugDirectory, options).then((inheritance) => {
      pugInheritanceCache = inheritance.tree;

      return gulp.src(`${pugDirectory}/*.pug`)
        .pipe(gulpif(global.watch, filter((file) => pugFilter(file, inheritance))))
        .pipe(pug({ pretty: true }))
        .pipe(debug({title: 'Pug'}))
        .pipe(production(replace('assets/','')))
        .pipe(gulp.dest(path.dev.htmlDir))
        .on('end', resolve)
        .on('error', reject);
    });
  });
});

/*----------- CSS -----------*/
gulp.task('css', function() {
  return gulp.src(path.src.cssAll, {since:gulp.lastRun('css')})
  .pipe( development(newer({dest: path.dev.css, extra: ['src/assets/css/*.sss', 'src/modules/**/*.sss']})))
  .pipe( production(newer(path.dev.css)))
  .pipe(debug({title: 'css'}))
  .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
  .pipe( development(remember('styles')) )
  .pipe( development(sourcemaps.init()) )
  .pipe( development(concat('main.css')) )
  .pipe( development(postcss(processors_dev, { parser: sugarss }) ))
  .pipe( production(postcss(processors_prod) ))
  .pipe( development(postcss([
    postcssImport({
      path: ["bower_components"],
    })
  ])))
  .pipe( development(removeEmptyLines()) )
  .pipe( development(sourcemaps.write('')) )
  .pipe( gulp.dest(path.dev.cssDir) );
});

gulp.task('css:libs', function() {
  return gulp.src(path.src.cssLibs, {since:gulp.lastRun('css:libs')})
  .pipe( debug({title: 'css:libs'}) )
  .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
  .pipe( development(rename({ extname: '.css' })) )
  .pipe( development(postcss([
    postcssImport({
      path: ["bower_components"],
    }),
    cssnano({
      autoprefixer:false
    })
  ])))
  .pipe( development(remember('styles2')) )
  .pipe( gulp.dest(path.dev.libsDir) );
});



/*----------- IMAGES -----------*/
gulp.task('img', function () {
  return gulp.src(path.src.img)
  .pipe(debug({title: 'Image'}))
  .pipe(production(imagemin()))
  .pipe(gulp.dest(path.dev.imgDir))
});

/*----------- IMAGES -----------*/
gulp.task('svg', function () {
  return gulp.src(path.src.svg)
  .pipe(debug({title: 'Svg'}))
  .pipe(svgmin())
  .pipe(svgstore())
  .pipe(rename({basename: 'sprite'}))
  .pipe(gulp.dest(path.dev.imgDir))
});

/*----------- JS -----------*/
gulp.task('js', function () {
  return gulp.src(path.src.jsModules)
  .pipe(newer({dest: path.dev.js, extra: path.watch.js}))
  .pipe(debug({title: 'js'}))
  .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
  .pipe(development(sourcemaps.init()))
  .pipe(rigger())
  .pipe(concat('main.js'))
  .pipe(development(sourcemaps.write('.')))
  .pipe(gulp.dest(path.dev.jsDir))
});

gulp.task('js:libs', function() {
  return gulp.src(path.src.jsLibs, {since:gulp.lastRun('js:libs')})
  .pipe(debug({title: 'js:libs'}))
  .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
  .pipe(rigger())
  .pipe(production(uglify()))
  .pipe( gulp.dest(path.dev.libsDir) );
});

/*----------- FONTS -----------*/
gulp.task('fonts', function() {
  return gulp.src(path.src.font, {since:gulp.lastRun('fonts')})
  .pipe(gulp.dest(path.dev.fontDir))
});

gulp.task('watch', function() {
  global.watch = true;

  gulp.watch([`${pugDirectory}/**/*.pug`], gulp.series('html'))
    .on('all', (event, filepath) => {
      global.changedTempalteFile = filepath.replace(/\\/g, '/');
    });
  gulp.watch(path.watch.css, gulp.series('css')).on('unlink', function(filepath){
    remember.forget('styles', mainPath.resolve(filepath));
  })
  gulp.watch(path.watch.cssLibs, gulp.series('css:libs')).on('unlink', function(filepath){
    remember.forget('styles2', mainPath.resolve(filepath));
  })
  gulp.watch(path.watch.img, gulp.series('img'));
  gulp.watch(path.watch.js, gulp.series('js'));
  gulp.watch(path.watch.jsLibs, gulp.series('js:libs'))
});

gulp.task('server', function() {
  browserSync.init({
    server: 'dev',
    ui: {
      port: 4001
    },
    port: 4001
  });

  browserSync.watch('dev/**/**/**/*.*').on('change', browserSync.reload)
});

gulp.task('dev', gulp.series('html', 'css', 'css:libs', 'img', 'svg', 'js', 'js:libs'));

gulp.task('default', gulp.series('dev', gulp.parallel('watch', 'server')));
