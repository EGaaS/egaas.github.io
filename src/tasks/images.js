module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src([
			dir.img + '/**',
			dir.folder + '/uploads/**',
			dir.folder + '/docs/**',
			'!' + dir.img + '/btn/',
			'!' + dir.img + '/ico/',
			'!' + dir.img + '/ico/*',
			], {
				base: dir.folder
			})
			.pipe(modules.imagemin({
				progressive: true,
				optimizationLevel: 7,
				svgoPlugins: [{
					removeViewBox: false
				}]
			}))
			.pipe(gulp.dest(dir.dist));
	};
};


