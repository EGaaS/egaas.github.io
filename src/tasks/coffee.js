module.exports = function (gulp, modules, dir) {
	return function() {
		return gulp.src(dir.js + '/*.coffee')
		.pipe(modules.coffee({
			bare: true
		}))
		.pipe(gulp.dest(dir.js));
	};
};