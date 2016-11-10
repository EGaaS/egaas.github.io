module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src([
			dir.folder + '/style.{sass,scss}',
		])
		.pipe(modules.sourcemaps.init())
		.pipe(modules.sass({
			indentedSyntax: true,
			// outputStyle: 'compressed',
			includePaths: [dir.css + '/*.{sass,scss}']
			// sourcemap: true,
			// sourcemapPath: './'
			// style: 'compact',
		}))
		.on('error', modules.swallowError)
		.pipe(modules.autoprefixer({
			browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Chrome 25']
		}))
		.on('error', modules.swallowError)
		.pipe(modules.sourcemaps.write('./maps'))
		.pipe(gulp.dest(dir.css));
	};
};


