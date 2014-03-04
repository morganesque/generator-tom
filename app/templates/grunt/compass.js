module.exports = {
	options: {
	    bundleExec: true,
	    sassDir: '<%= yeoman.src %>/sass',
	    cssDir: '<%= yeoman.build %>/css',
	    imagesDir: '<%= yeoman.build %>/img',
	    javascriptsDir: '<%= yeoman.build %>/js',
	    relativeAssets: false,
	    httpImagesPath: '../img',
	    httpGeneratedImagesPath: '../img/generated',
	    outputStyle: 'compact', // nested, expanded, compact, compressed
	    importPath: '<%= yeoman.bower %>',
	    // raw: 'extensions_dir = "<%= yeoman.src %>/_bower_components"\n'
	},
	server: {
	    options: {
	        debugInfo: false,
	        generatedImagesDir: '<%= yeoman.build %>/img/generated'
	    }
	}
};