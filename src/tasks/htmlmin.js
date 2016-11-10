module.exports = function (gulp, modules, dir) {
	return function() {
		gulp.src(dir.dist + '/*.html')
		
		.pipe(modules.htmlMinify({
			empty: true,
			quotes: true,
			conditionals: true,
			// loose: true
		}))
		.pipe(gulp.dest(dir.dist));

		gulp.src(dir.folder + '/vendor/font-awesome/fonts/**.*')
			.pipe(gulp.dest(dir.dist_css + '/../fonts'));
		
		
		return gulp.src(dir.dist + '/view/**/*.html').pipe(modules.htmlMinify({
			empty: true,
			quotes: true,
			conditionals: true,
			// loose: true
		}))
		.pipe(gulp.dest(dir.dist + '/view'));
	};
};

