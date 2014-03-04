module.exports = {
    all: {
        // specify files in array format with multiple src-dest mapping
        files: [
            // rasterize all SVG files in "img" and its subdirectories to "img/png"
            {
                cwd: '<%= yeoman.src %>/img/',
                src: '**/*.svg',
                dest: '<%= yeoman.build %>/img/'
            },
        ]
    }
};