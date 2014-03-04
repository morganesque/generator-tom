'use strict';
module.exports = function(grunt) {

    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    
    // load grunt config & tasks
    require('load-grunt-config')(grunt,{
        config: {
            yeoman: {
                src: 'src',
                build: 'build',
                bower: 'bower_components'
            }   
        }
    });

    // load my tasks
    grunt.loadTasks('tasks');
};
