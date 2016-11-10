module.exports = function (gulp, modules, dir) {
	return function() {
		
		return gulp.src([
			dir.folder + '/**',
			'!' + dir.folder + '/sass/',
			'!' + dir.folder + '/sass/**',
			'!' + dir.folder + '/*.{scss,sass}',
			'!' + dir.folder + '/view/js/',
			'!' + dir.folder + '/view/js/**',
			'!' + dir.folder + '/view/js/*.js',
			'!' + dir.js + '/**',
			'!' + dir.css + '/imports/**',
			'!' + dir.css + '/maps/**',
			'!' + dir.img,
			'!' + dir.img + '/**',
			'!' + dir.folder + '/hbs/',
			'!' + dir.folder + '/hbs/**',
			'!' + dir.folder + '/vendor/',
			'!' + dir.folder + '/vendor/**',
			'!' + dir.folder + '/uploads/**',
			'!' + dir.folder + '/maket.jpg',
			'!' + dir.folder + '/*.html',
			'!' + dir.folder + '/*.cfg',
			'!' + dir.folder + '/version.json'
		])
		.pipe(gulp.dest(dir.dist));
	};
};

