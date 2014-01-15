/*
    This is my own version which I've hacked up to do what i want. Mwah ha ha ha!!
*/
/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Internal lib.
    // var comment = require('./lib/comment').init(grunt);
    var bower = require('bower');

    grunt.registerMultiTask('concatBower', 'Concatenate files.', function() 
    {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: grunt.util.linefeed,
            banner: '',
            footer: '',
            stripBanners: false,
            process: false
        });

        var files = [];
        var tmp = grunt.file.read(this.files[0].src).split("\n");
        tmp.forEach(function(f)
        {
            if (f != '') 
            {
                var g = bower.config.directory+'/tmp'+ f.substr(f.lastIndexOf('/'));
                files.push(g);
            }
        });
        // grunt.log.writeln(JSON.stringify(files));

        // Normalize boolean options that accept options objects.
        if (options.stripBanners === true) { options.stripBanners = {}; }
        if (options.process === true) { options.process = {}; }

        // Process banner and footer.
        var banner = grunt.template.process(options.banner);
        var footer = grunt.template.process(options.footer);

        var src = banner + files.filter(function(filepath) 
        {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            } else {
                return true;
            }
        }).map(function(filepath) {
            // Read file source.
            var src = grunt.file.read(filepath);
            // Process files as templates if requested.
            if (typeof options.process === 'function') 
            {
                src = options.process(src, filepath);
            } else if (options.process) {
                src = grunt.template.process(src, options.process);
            }
            return src;
        }).join(options.separator) + footer;        

        grunt.file.write(this.files[0].dest, src);
        grunt.log.writeln('File "' + this.files[0].dest + '" created.');
    });

};
