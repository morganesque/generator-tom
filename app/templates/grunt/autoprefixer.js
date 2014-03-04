module.exports = {
	options: {
	    browsers: ['last 2 versions']
	},
	server: {
	    files: [{
	        expand: true,
	        src: '<%= yeoman.build %>/css/**/*.css' // no dest set means files over-written.
	    }]
	}
};