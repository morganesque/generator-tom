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

    var prompts = [
    {
        // type: 'confirm',
        name: 'jekyllBool',
        message: 'Would you like Jekyll?',
        // default: true
    }];

    this.prompt(prompts, function(props)
    {
        this.siteName = props.siteName;
        cb();
    }.bind(this));
};

TomGenerator.prototype.app = function app()
{
    this.mkdir('dev');
    this.mkdir('dev/_scss');
    this.copy('empty', 'dev/_scss/main.scss');

    this.mkdir('dev/_bower_components');
    this.copy('empty', 'dev/_bower_components/allJS.conf');

    this.mkdir('build');
    // this.mkdir('build/img');
    // this.mkdir('build/js');
    // this.mkdir('build/css');

    this.mkdir('tasks');
    this.copy('tasks/grabBower.js', 'tasks/grabBower.js');
    this.copy('tasks/concatBower.js', 'tasks/concatBower.js');
    // this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('Gemfile', 'Gemfile');
    // this.copy('tasks', 'tasks');
};

TomGenerator.prototype.projectfiles = function projectfiles()
{

};