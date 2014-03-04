module.exports = {
	test: {
	    files: [{
	        expand: true,
	        cwd: '<%= yeoman.bower %>/tmp',
	        src: '**/*.js',
	        dest: '<%= yeoman.bower %>/tmp',
	    }]
	},
	therest: {
	    files: [{
	        expand: true,
	        cwd: '<%= yeoman.src %>/js',
	        src: '**/*.js',
	        dest: '<%= yeoman.build %>/js',
	    }]
	}
};