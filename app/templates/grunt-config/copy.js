module.exports = {
    dist: {
        expand:true,
        cwd: '<%= yeoman.src %>/img/',
        src: '**/*.{gif,jpg,jpeg,png,webp}',
        dest: 'build/img/',    
        filter: 'isFile',
    }
};