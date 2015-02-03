module.exports = {
    options: { // Configuration that will be passed directly to SVGO
        plugins: [{
            removeViewBox: false
        }, {
            removeUselessStrokeAndFill: false
        }]
    },
    dist: { // Target
        files: [{ // Dictionary of files
            expand: true,
            cwd: '<%= yeoman.src %>/img/',
            src: '**/*.svg',
            dest: '<%= yeoman.build %>/img/',
        }]
    }
};