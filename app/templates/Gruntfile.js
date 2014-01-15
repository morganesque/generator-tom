// Generated on 2014-01-07 using generator-jekyllrb 1.1.0
'use strict';

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function(grunt)
{

    // Show elapsed time after tasks run
    require('time-grunt')(grunt);

    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    // get bower
    var bower = require('bower');

    // load my tasks
    grunt.loadTasks('tasks');

    grunt.initConfig(
    {

        // Configurable paths
        yeoman:
        {
            dev: 'dev',
            build: 'build',
            bower: bower.config.directory
        },

        /*** WATCH ***/
        watch:
        {
            compass:
            {
                files: ['<%= yeoman.dev %>/sass/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            // autoprefixer:
            // {
            //     files: ['<%= yeoman.build %>/css/**/*.css'],
            //     tasks: ['autoprefixer:server'] //'copy:stageCss',
            // },
            jekyll:
            {
                files: [
                    '<%= yeoman.build %>/**/*.{html,yml,md,mkd,markdown}',
                    '<%= yeoman.build %>/_config.yml',
                ],
                tasks: ['jekyll:server']
            },
            livereload:
            {
                options:
                {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.jekyll/**/*.html',
                    '<%= yeoman.build %>/css/**/*.css',
                    '<%= yeoman.build %>/js/**/*.js',
                    '<%= yeoman.build %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            },
            allJS:
            {
                files: ['<%= yeoman.dev %>/js/allJS.conf'],
                tasks: ['allJS']
            }
        },

        /*** CONNECT - this is the local server ***/
        connect:
        {
            options:
            {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // change this to '0.0.0.0' to access the server from outside
            },
            livereload:
            {
                options:
                {
                    open: false,
                    base: [
                        '.jekyll',
                        '<%= yeoman.build %>'
                    ]
                }
            }
        },

        /*** CLEAN - just deletes things really ***/
        clean:
        {
            server: ['.jekyll'],
            alljs: ['<%= yeoman.bower %>/tmp']
        },

        /*** CONCURRENT - not sure what this one does right now ***/
        concurrent:
        {
            server: [
                'compass:server',
                'jekyll:server'
            ]
        },

        /*** COMPASS - preprocessor for CSS dumps the results into the /css/ dir ***/
        compass:
        {
            options:
            {
                bundleExec: true,
                sassDir: '<%= yeoman.dev %>/sass',
                cssDir: '<%= yeoman.build %>/css',
                imagesDir: '<%= yeoman.build %>/img',
                javascriptsDir: '<%= yeoman.build %>/js',
                relativeAssets: false,
                httpImagesPath: '../img',
                httpGeneratedImagesPath: '../img/generated',
                outputStyle: 'expanded',
                importPath: "<%= yeoman.bower %>",
                // raw: 'extensions_dir = "<%= yeoman.dev %>/_bower_components"\n'
            },
            server:
            {
                options:
                {
                    debugInfo: false,
                    generatedImagesDir: '<%= yeoman.build %>/img/generated'
                }
            }
        },

        /*** AUTO PREFIXER ***/
        autoprefixer:
        {
            options:
            {
                browsers: ['last 2 versions']
            },
            server:
            {
                files: [
                {
                    expand: true,
                    src: '<%= yeoman.build %>/css/**/*.css' // no dest set means files over-written.
                }]
            }
        },

        /*** JEKYLL ***/
        jekyll:
        {
            options:
            {
                bundleExec: true,
                config: '<%= yeoman.build %>/_config.yml,_config.build.yml',
                src: '<%= yeoman.build %>'
            },
            server:
            {
                options:
                {
                    config: '<%= yeoman.build %>/_config.yml',
                    dest: '.jekyll'
                }
            },
            check:
            {
                options:
                {
                    doctor: true
                }
            }
        },

        /*** UGLIFY ***/
        uglify:
        {
            test:
            {
                files: [
                {
                    expand: true,
                    cwd: '<%= yeoman.bower %>/tmp',
                    src: '**/*.js',
                    dest: '<%= yeoman.bower %>/tmp',
                }]
            }
        },

        /*** GrabBower ***/
        grabBower:
        {
            options:
            {
                allJSconf: '<%= yeoman.dev %>/js/allJS.conf'
            },
        },

        /*** concatBower ***/
        concatBower:
        {
            options:
            {
                banner: "/*! Concatinated and Minified for your convenience. */\n",
                footer: "\n/*! This is the end (my only friend the end). */",
                process: function(src, filepath)
                {
                    var f = filepath.substr(filepath.lastIndexOf('/') + 1);
                    return "/*! " + f + " */\n" + src;
                }
            },
            test:
            {
                src: '<%= yeoman.dev %>/js/allJS.conf',
                dest: '<%= yeoman.build %>/js/all.min.js',
            }
        }

    }); //-- endof grunt.initConfig

    grunt.registerTask('serve', function()
    {
        grunt.task.run([
            'allJS',
            'clean:server',
            'concurrent:server',
            // 'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('allJS', function()
    {
        grunt.task.run(['grabBower', 'uglify:test', 'concatBower:test', 'clean:alljs']);
    });
};