'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TomGenerator = module.exports = function TomGenerator(args, options, config)
{
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function()
    {
        this.installDependencies(
        {
            skipInstall: options['skip-install']
            // skipInstall: true
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TomGenerator, yeoman.generators.Base);

TomGenerator.prototype.askFor = function askFor()
{
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        // type: 'confirm',
        name: 'siteName',
        message: 'What is the name of the project yo!?',
        // default: true
    },{
        type: 'list',
        name: "gulpOrGrunt",
        message: "To gulp or to grunt? That is the question",
        choices: ['gulp','grunt']
    },{
        type: 'list',
        name: "jekyllYesNo",
        message: "Would this be Jekyll your honour?",
        choices: ['yes','no']
    }];

    this.prompt(prompts, function(props)
    {
        this.siteName = props.siteName;
        this.gulpOrGrunt = props.gulpOrGrunt;
        this.jekyllYesNo = props.jekyllYesNo;
        cb();
    }.bind(this));
};

TomGenerator.prototype.app = function app()
{
    this.mkdir('src');
    this.mkdir('src/sass');
    this.mkdir('src/js');
    this.mkdir('src/img');
    this.mkdir('src/jekyll');
    
    // sass
    this.copy('sass/styles.scss', 'src/sass/styles.scss');
    // this.copy('sass/ielte8.scss', 'src/sass/ielte8.scss');
    this.copy('sass/_mixins.scss', 'src/sass/_mixins.scss');
    this.copy('sass/_isuck.scss', 'src/sass/_isuck.scss');
    this.copy('sass/config.rb', 'src/sass/config.rb');

    // js
    this.mkdir('bower_components');
    this.copy('js/allJS.conf', 'src/js/allJS.conf');
    this.copy('empty', 'src/js/lteie8.conf');
    this.copy('js/log.js', 'bower_components/log.js');

    if (this.jekyllYesNo == 'yes')
    {
        // jekyll
        this.mkdir('src/jekyll/_includes');
        this.mkdir('src/jekyll/_data');
        this.mkdir('src/jekyll/_posts');
        this.mkdir('src/jekyll/_layouts');
        this.copy('jekyll/_layout.html', 'src/jekyll/_layouts/default.html');
        this.copy('jekyll/top.html', 'src/jekyll/_includes/top.html');
        this.copy('jekyll/bottom.html', 'src/jekyll/_includes/bottom.html');
        this.copy('jekyll/_config.yml', '_config.yml');        
    }

    // build
    this.mkdir('build');
    this.mkdir('build/img');
    this.mkdir('build/js');
    this.mkdir('build/css');

    // project admin 
    this.copy('project.sublime-project', this.siteName + '.sublime-project');    
    this.template('project.sh', 'project.sh'        );    

    // configs
    this.copy('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');

    this.copy('index.html', 'build/index.html');

    if (this.gulpOrGrunt == 'grunt')
    {
        this.copy('Gruntfile.js', 'Gruntfile.js');
        
        this.mkdir('tasks');
        this.copy('tasks/grabBower.js', 'tasks/grabBower.js');
        this.copy('tasks/concatBower.js', 'tasks/concatBower.js');
        
        this.copy('grunt-package.json', 'package.json');

        this.mkdir('grunt');
        this.copy('grunt/aliases.yml','grunt/aliases.yml');
        this.copy('grunt/autoprefixer.js','grunt/autoprefixer.js');
        this.copy('grunt/clean.js','grunt/clean.js');
        this.copy('grunt/compass.js','grunt/compass.js');
        this.copy('grunt/concatBower.js','grunt/concatBower.js');
        this.copy('grunt/concurrent.js','grunt/concurrent.js');
        this.copy('grunt/connect.js','grunt/connect.js');
        this.copy('grunt/copy.js','grunt/copy.js');
        this.copy('grunt/grabBower.js','grunt/grabBower.js');
        this.copy('grunt/imageoptim.js','grunt/imageoptim.js');
        this.copy('grunt/jekyll.js','grunt/jekyll.js');
        this.copy('grunt/svg2png.js','grunt/svg2png.js');
        this.copy('grunt/svgmin.js','grunt/svgmin.js');
        this.copy('grunt/uglify.js','grunt/uglify.js');
        this.copy('grunt/watch.js','grunt/watch.js'        );
    }

    if (this.gulpOrGrunt == 'gulp')
    {
        this.copy('gulp/package.json', 'package.json');
        this.copy('gulp/gulpfile.js', 'gulpfile.js');
    }

    this.copy('Gemfile', 'Gemfile');
};

TomGenerator.prototype.projectfiles = function projectfiles()
{

};