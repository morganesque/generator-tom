module.exports = {
    compass: {
        files: ['<%= yeoman.src %>/sass/**/*.{scss,sass}'],
        tasks: ['compass:server']
    },
    // autoprefixer:
    // {
    //     files: ['<%= yeoman.build %>/css/**/*.css'],
    //     tasks: ['autoprefixer:server'] //'copy:stageCss',
    // },
    jekyll: {
        files: [
            '<%= yeoman.build %>/**/*.{html,yml,md,mkd,markdown}',
            '<%= yeoman.build %>/_config.yml',
        ],
        tasks: ['jekyll:server']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
            // livereload: 35729
        },
        files: [
            '.jekyll/**/*.html',
            '<%= yeoman.build %>/css/**/*.css',
            '<%= yeoman.build %>/js/**/*.js',
            '<%= yeoman.build %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
    },
    allJS: {
        files: ['<%= yeoman.src %>/js/allJS.conf'],
        tasks: ['allJS']
    },
    restJS: {
        files: ['<%= yeoman.src %>/js/**/*.js'],
        tasks: ['newer:uglify:therest']
    },
    svg: {
        files: ['<%= yeoman.src %>/img/**/*.svg'],
        tasks: ['newer:svg2png','newer:svgmin']
    },
    imageoptim: {
        files: ['<%= yeoman.src %>/img/**/*'],
        tasks: ['newer:copy:dist','newer:imageoptim:dist']
    }
};