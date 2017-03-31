
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var modules = require('gulp-load-plugins')({
	rename: {
		'gulp-minify-html': 'htmlMinify',
		'gulp-minify-css': 'cssMinify',
		'gulp-ruby-sass': 'rubySass',
		// 'gulp-compile-handlebars': 'handlebars',
		// 'gulp-css-url-adjuster': 'cssAdjuster'
	}
});

modules.uncache = require('gulp-uncache');
modules.cssAdjuster = require('gulp-css-url-adjuster');
modules.beep = require('beepbeep');

modules.swallowError = function(error) {
	modules.beep();
	console.log(error.toString());
	return this.emit('end');
};

// var cwd = process.cwd();
// cwd.slice(__dirname.length  + 1)

var dir = new function(){
	this.root   = __dirname;
	// this.base   = cwd !== __dirname ? '.' : 'www/zozhgo';
	this.base   = '.';
	this.folder = this.base   + '/www';
	this.dist   = '../';
	
	this.js     = this.folder + '/js';
	this.css    = this.folder + '/css';
	this.img    = this.folder + '/images';
	this.dist_css   = this.dist + '/css';
	this.dist_img   = this.dist + '/images';
	this.dist_js    = this.dist + '/js';
};


var getTask = function getTask(task){
	var task;
	
	task = require(__dirname + '/tasks/' + task);
	
	return task(gulp, modules, dir);
};

gulp.task('coffee', getTask('coffee'));
gulp.task('usemin', getTask('usemin'));
gulp.task('htmlmin', getTask('htmlmin'));
gulp.task('styles', getTask('styles'));
gulp.task('sprite', getTask('sprite'));
gulp.task('images', getTask('images'));
gulp.task('csso', getTask('csso'));
gulp.task('hbs', getTask('hbs'));
gulp.task('distcopy', getTask('distcopy'));

gulp.task('default', function() {
	
	gulp.watch([dir.folder.slice(2) + '/hbs/*.html'], ['hbs']);
	gulp.watch([dir.folder.slice(2) + '/*.{sass,scss}'], ['styles']);
	gulp.watch(dir.img.slice(2) + '/ico/**.png', ['sprite']);
	
	modules.livereload.listen();
	
	return gulp.watch([
		dir.folder.slice(2) + '/*.html',
		dir.js.slice(2) + '/*.js',
		dir.css.slice(2) + '/main.css',
		dir.img.slice(2) + '/**'
	])
	.on('change', modules.livereload.changed);

});

gulp.task('build', function() {
	
	modules.sequence = require('run-sequence');
	modules.sequence(
		'distcopy',
		'sprite',
		/*'images',*/
		'hbs',
		'styles',
		'coffee',
		'usemin',
		'csso',
		'htmlmin'
	);
});

gulp.task('postbuild', function() {
	
	modules.sequence = require('run-sequence');
	modules.sequence(
		'hbs',
		'styles',
		'usemin',
		'csso',
		'htmlmin'
	);
});
