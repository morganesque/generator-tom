module.exports = {
    options: {
        bundleExec: true,
        config: '<%= yeoman.build %>/_config.yml,_config.build.yml',
        src: '<%= yeoman.build %>',
        raw: 'exclude: ["js","img","css"]',
    },
    server: {
        options: {
            config: '<%= yeoman.build %>/_config.yml',
            dest: '.jekyll'
        }
    },
    check: {
        options: {
            doctor: true
        }
    }
};