module.exports = {
    options: {
        banner: "/*! Concatinated and Minified for your convenience. */\n",
        footer: "\n/*! This is the end (my only friend the end). */",
        process: function(src, filepath) {
            var f = filepath.substr(filepath.lastIndexOf('/') + 1);
            return "/*! " + f + " */\n" + src;
        }
    },
    test: {
        src: '<%= yeoman.src %>/js/allJS.conf',
        dest: '<%= yeoman.build %>/js/all.min.js',
    }
};