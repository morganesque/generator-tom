module.exports = function(grunt)
{
    var bower = require('bower');

    grunt.registerTask('grabBower', 'Say hello!', function() 
    {
        var tmp = bower.config.directory+'/tmp';
        var ef = grunt.file.exists(tmp);
        if (!ef) grunt.file.mkdir(tmp);

        var opt = this.options();   

        var files = grunt.file.read(opt.allJSconf).split("\n");

        grunt.config.set('grabBower.jsFiles', files);

        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            if (f !== '' && f.charAt(0) !== '#')
            {
                f = bower.config.directory+'/'+f;
                var e = grunt.file.exists(f);
                if (e)
                {
                    var dest = tmp + f.substr(f.lastIndexOf('/'));
                    grunt.log.writeln("coping: "+f);
                    grunt.file.copy(f,dest);
                } else {
                    grunt.fail.fatal("File ("+f+") not found. I'm stopping right here. Sort this you muppet!");
                }
            }  
        };

        grunt.task.run();
    });
};