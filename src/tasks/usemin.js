module.exports = function (gulp, modules, dir) {
	return function() {
		gulp.src(dir.folder + '/*.{php,html}')
		.pipe(modules.usemin({
			css: ['concat'/*, modules.cssMinify(),modules.rev()*/ ],
			js: [modules.ngAnnotate(), modules.uglify()/*, modules.rev()*/ ]
		})).pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"./js/'
			},{
				match: /\"\/?css\//g,
				replacement: '"./css/'
			},{
				match: /\"\/?images\//g,
				replacement: '"./images/'
			},{
				match: /\"\/?uploads\//g,
				replacement: '"./docs/'
			},{
				match: /\"\/?favicon.ico/g,
				replacement: '"./favicon.ico'
			}]
		}))
		.pipe(gulp.dest(dir.dist));
		
		return gulp.src(dir.folder + '/view/**/*.html')
		.pipe(modules.usemin({
			path: dir.folder,
			css: ['concat'/*, modules.cssMinify(),modules.rev()*/ ],
			js1: [modules.uglify() ],
			js2: [modules.uglify() ],
			js3: [modules.uglify() ],
			js4: [modules.uglify() ],
			js5: [modules.uglify() ],
			js6: [modules.uglify() ],
			js7: [modules.uglify() ]
		})).pipe(modules.replaceTask({
			patterns: [{
				match: /\"\/?js\//g,
				replacement: '"./view/js/'
			}/*,{
				match: /\"\/?css\//g,
				replacement: '"/themes/frontend/css/'
			},{
				match: /\"\/?images\//g,
				replacement: '"/themes/frontend/images/'
			},{
				match: /\"\/?uploads\//g,
				replacement: '"/themes/frontend/docs/'
			}*/]
		}))
		.pipe(gulp.dest(dir.dist + '/view'));
	};
};
