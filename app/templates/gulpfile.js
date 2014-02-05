var gulp 	     = require('gulp'),
    gutil        = require('gulp-util'),
    fs 	         = require('fs'),
    compass      = require('gulp-compass'),
    concat       = require('gulp-concat'),
    jekyll 	     = require('gulp-jekyll'),
    uglify 	     = require('gulp-uglify'),
    svgmin       = require('gulp-svgmin'),
    imagemin 	 = require('gulp-imagemin'),
    debug        = require('gulp-debug'),
    serve        = require('gulp-serve'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload'),
    lr           = require('tiny-lr'),
    server       = lr();

/*
    ----- COMPASS -----
*/
gulp.task('compass',function()
{
    return gulp.src('src/sass/*.scss')
        .pipe(compass({
            project:'.',
            config_file:'src/sass/config.rb',
            css:'build/css',
            sass:'src/sass',
            import_path:'bower_components',
            style:'compact',
        }));
});

/*
    ----- AUTO PREFIX -----
*/
gulp.task('styles',function()
{
    return gulp.src('build/css/*.css')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))        
        .pipe(gulp.dest('build/css'))
        .pipe(livereload(server));
});

/*
    ----- JEKYLL -----
*/
gulp.task('jekyll',function()
{
    /* jekyll */
    return gulp.src(['build/**/*.{html,yml,md,mkd,markdown}','build/_config.yml'])
        .pipe(jekyll({
            source: './build',
            destination: '.jekyll',
            // bundleExec:true,
        }))
        .pipe(gulp.dest('.jekyll'));
});

/*
    ----- JS LIBRARIES -----
*/
gulp.task('libScripts',function()
{
    var src = fs.readFileSync('src/js/allJS.conf','utf8').trim().split('\n');
    gutil.log(src);
    src.forEach(function(v)
    {
        // if (!fs.existsSync(v)) gutil.log        
    });

    /* javascript minify */    
    return gulp.src(src,{base:'bower_components/'})
        .pipe(uglify())  
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload(server));
});

/*
    ----- JS FILES -----
*/
gulp.task('scripts',function()
{
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())  
        .pipe(gulp.dest('build/js'))
        .pipe(livereload(server));
});

/*
    ----- SVG MINIFY -----
*/
gulp.task('svg',function()
{
    return gulp.src('src/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img'));
});

/*
    ----- BITMAPS MINIFY -----
*/
gulp.task('bitmaps',function()
{
    return gulp.src('src/img/*.{jpg,jpeg,gif,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

/*
    ----- SERVER -----
*/
gulp.task('serve', serve(['.jekyll','build']));

/*
    ----- WATCH -----
*/
gulp.task('watch', function() {
 
    // Listen on port 35729
    server.listen(35729, function (err) 
    {
        if (err) { return console.log(err); } 

        // Watch .scss files
        gulp.watch('src/sass/**/*.scss', function(event) {
            message(event, 'compass');
            gulp.run('compass');
        });

        // Watch .css files
        gulp.watch('build/css/**/*.css', function(event) {
            message(event, 'styles');
            gulp.run('styles');
        });
     
        // Watch .js files
        gulp.watch('src/js/**/*.js', function(event) {
            message(event,'scripts');
            gulp.run('scripts');
        });

        // Watch JS library conf
        gulp.watch('src/js/allJS.conf', function(event) {
            message(event,'');
            gulp.run('libScripts');
        });

        // Watch bitmaps
        gulp.watch('src/img/*.{jpg,jpeg,gif,png}', function(event) {
            message(event,'');
            gulp.run('bitmaps'); 
        })

        // Watch Jekyll files
        gulp.watch('build/**/*.{html,yml,md,mkd,markdown}',function(event)
        {
            message(event,'');
            gulp.run('jekyll'); 
        })

        function message(event,name)
        {
            var d = new Date();
            gutil.log(d.getHours()+':'+d.getMinutes()+' - ' + event.path + ' was ' + event.type + ', running tasks...');
        }        

    });
});

/*
    ----- DEFAULT -----
*/
gulp.task('default', function(){
    gulp.run('watch');
    gulp.run('serve');
});