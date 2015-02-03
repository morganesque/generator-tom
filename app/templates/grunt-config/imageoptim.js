module.exports = {
	imageoptim: {            
	    dist: {
	        options: {
	            jpegMini: false,
	            imageAlpha: true,
	            quitAfter: true
	        },
	        src: ['<%= yeoman.build %>/img/']
	    }
	}
};