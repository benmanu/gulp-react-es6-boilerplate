/**
 * Tasks:
 *     gulp             (runs all prod tasks excl. watch)
 *     gulp css         (dev css task)
 *     gulp css:prod    (prod css task)
 *     gulp js          (dev js task)
 *     gulp js:prod     (prod js browserify task)
 *     gulp watch       (dev watcher task)
 *     gulp watch:prod  (prod watcher task)
 */

// requirements
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var prefix      = require('gulp-autoprefixer');
var browserify  = require('browserify');
var babelify    = require('babelify');
var uglify      = require('gulp-uglify');
var stream      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

// source paths
var base = 'themes/default/'; // theme root

var build = { // build folders (where will the development happen?)
	scss: base + 'scss/',
	js: base + 'js/'
}

var dist = { // distribution folders (where should the output live?)
	css: base + 'dist/css/',
	js: base + 'dist/js/'
}

// build paths
var paths = {
	css: {
		src: [
			build.scss + '*.scss'
		],
		dest: dist.css,
		watch: [
			build.scss + '*.scss',
			build.scss + '**/*.scss'
		]
	},
	scripts: {
		main: './' + build.js + 'app.jsx',
        dest: dist.js,
		watch: [
			build.js + 'app.jsx',
            build.js + '**/*.jsx',
			build.js + '**/*.js'
		]
	}
}

// dev css processing (unminified)
gulp.task('css', function() {

	var src = paths.css.src;
	var dest = paths.css.dest;

	// compile the css
    return gulp.src(src)
        .pipe(sass({
        	sourceComments: 'map',
        	includePaths: [
        		build.scss
        	]
        }))
        .pipe(prefix("last 1 version", "> 1%", "ie 8"))
        .pipe(gulp.dest(dest));

});

// production css processing (minified)
gulp.task('css:prod', ['css'], function() {

    var src = paths.css.dest + '*.css';
    var dest = paths.css.dest;

    // compile the css
    return gulp.src(src)
        .pipe(minifyCSS())
        .pipe(gulp.dest(dest));
});

// dev js processing (unminified)
gulp.task('js', function() {
    
    var src = paths.scripts.main;
    var dest = paths.scripts.dest;

    // compile full js
    return browserify({
            entries: [src],
            extensions: ['.js', '.jsx'],
            debug: true,
            fullPaths: true
        })
        .transform(babelify)
        .bundle()
        .pipe(stream('app.js'))
        .pipe(gulp.dest(dest));

});

// production js processing (minified)
gulp.task('js:prod', function() {
    
    var src = paths.scripts.main;
    var dest = paths.scripts.dest;

    // compile full js
    return browserify({
            entries: [src],
            extensions: ['.js', '.jsx'],
            debug: true,
            fullPaths: true
        })
        .transform(babelify)
        .bundle()
        .pipe(stream('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dest));

});

gulp.task('watch', ['css', 'js'], function() {
    gulp.watch(paths.css.watch, ['css']);
    gulp.watch(paths.scripts.watch, ['js']);
});

gulp.task('watch:prod', ['css:prod', 'js:prod'], function() {
	gulp.watch(paths.css.watch, ['css:prod']);
    gulp.watch(paths.scripts.watch, ['js:prod']);
});

gulp.task('default', [
	'css:prod',
    'js:prod'
]);
