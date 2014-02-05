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
    }];

    this.prompt(prompts, function(props)
    {
        this.siteName = props.siteName;
        this.gulpOrGrunt = props.gulpOrGrunt;
        cb();
    }.bind(this));
};

TomGenerator.prototype.app = function app()
{
    this.mkdir('src');
    this.mkdir('src/sass');
    this.copy('sass/styles.scss', 'src/sass/styles.scss');
    this.copy('sass/ielte8.scss', 'src/sass/ielte8.scss');
    this.copy('sass/_mixins.scss', 'src/sass/_mixins.scss');
    this.copy('sass/config.rb', 'src/sass/config.rb');

    this.mkdir('bower_components');
    this.mkdir('src/js');
    this.copy('empty', 'src/js/allJS.conf');
    this.copy('js/log.js', 'bower_components/log.js');

    this.mkdir('src/img');

    this.mkdir('build');
    this.mkdir('build/img');
    this.mkdir('build/js');
    this.mkdir('build/css');

    this.copy('project.sublime-project', this.siteName + '.sublime-project');    
    this.copy('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');

    if (this.gulpOrGrunt == 'grunt')
    {
        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.mkdir('tasks');
        this.copy('tasks/grabBower.js', 'tasks/grabBower.js');
        this.copy('tasks/concatBower.js', 'tasks/concatBower.js');
        this.copy('grunt-package.json', 'package.json');
    }

    if (this.gulpOrGrunt == 'gulp')
    {
        this.copy('gulp-package.json', 'package.json');
        this.copy('gulpfile.js', 'gulpfile.js');
    }

    this.copy('Gemfile', 'Gemfile');
};

TomGenerator.prototype.projectfiles = function projectfiles()
{

};