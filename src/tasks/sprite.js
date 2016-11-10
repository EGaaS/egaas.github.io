module.exports = function (gulp, modules, dir) {
	return function() {
		var spriteData;
		
		spriteData = gulp.src(dir.img + '/ico/*.{png,jpg}')
		.pipe(modules.spritesmith({
			imgName: 'icons.png',
			cssName: 'icons.scss',
			algorithm: 'binary-tree',
			cssFormat: 'css',
			cssTemplate: dir.root + '/scss.template.mustache'
		}));
		
		spriteData.img
			.pipe(modules.imagemin())
			.pipe(gulp.dest(dir.img));
		spriteData.css
			.pipe(gulp.dest(dir.css + '/imports'));
	};
};


