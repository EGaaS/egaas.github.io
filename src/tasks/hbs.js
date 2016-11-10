module.exports = function (gulp, modules, dir) {
	
	var fs = require('fs');
	
	if(fs.existsSync(dir.folder + '/hbs')){
		
		var options = {
			batch : [dir.folder + '/hbs/partials'],
			helpers : {
				capitals : function(str){
					return str.toUpperCase();
				}
			}
		};
		
		return function() {
			return gulp.src([
				dir.folder + '/hbs/*.html',
			])
			.pipe(modules.compileHandlebars({}, options))
			.pipe(gulp.dest(dir.folder));
		};
	};
	
};


