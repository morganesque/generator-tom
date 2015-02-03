module.exports = {
    options: {
        port: 9000,
        // this is the bit that injects the script into your files.
        livereload: 35729,
        hostname: '192.168.1.79' // change this to '0.0.0.0' to access the server from outside
        // hostname: '192.168.1.136' // change this to '0.0.0.0' to access the server from outside
    },
    livereload: {
        options: {
            open: false,
            base: [
                '.jekyll',
                '<%= yeoman.build %>'
            ]
        }
    }
};