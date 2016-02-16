var gulp = require('gulp'),
    watch = require('gulp-watch'),
    //ignore = require('gulp-ignore'),
    //inject = require('gulp-inject'),
    source = require('vinyl-source-stream'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    coffee =  require('gulp-coffee'),
    server = require('gulp-server-livereload'),
    //changed = require('gulp-changed'),
    //browserify = require('browserify'),
    //watchify = require('watchify'),
    //reactify = require('reactify'),
    react = require('gulp-react');


gulp.task('webserver', function() {
  gulp.src([
    '.'
  ])
    .pipe(server({
      livereload: false,
      directoryListing: true,
      open: true,
    }));
});

//***************************************
// set up browserify and watchify build
//***************************************

function bundleMyShitGoddamit(){
    var opts = browserify({
        //entries: ['./app/app.js'],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true 
    });

    var bundle = watchify(opts);

    bundle.transform(reactify);

    bundle.on('update',handleChange);

    reBundle();

    function handleChange(){
        var updateStart = Date.now();
        console.log('Updating BUndle!');
        var b = reBundle();
        console.log('Bundle Updated!', (Date.now() - updateStart) + 'ms');
        return b;
    }

    function reBundle(){
        console.log("Rebundling");
        return bundle.bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('./app'));
    }
}


gulp.task('browserify',bundleMyShitGoddamit);
//***************************************
// compile source files to app dir
//***************************************

var notify = function(message) {
    console.log(message);
};

gulp.task('compileJsx',function(){
    return gulp.src('src/**/*.jsx')
    .pipe(watch('src/**/*.jsx',function(event){
        notify("Jsx Components changed!");
    }))
    .pipe(react())
    .pipe(gulp.dest('app'));
});

gulp.task('compileCoffee',function(){
    return gulp.src('src/**/*.coffee')
    .pipe(watch('src/**/*.coffee',function(event){
        notify("Scripting Changed!");
    }))
        //.pipe(changed('app'))
        .pipe(coffee())
        .pipe(gulp.dest('app'));
});

gulp.task('compileJade',function(){
    return gulp.src('src/**/*.jade')
    .pipe(watch('src/**/*.jade',function(event){
        notify("Markup Changed!");
    }))
    //.pipe(changed('app'))
    .pipe(jade())
    .pipe(gulp.dest('app'));
});

gulp.task('compileStylus',function(){
    return gulp.src('src/**/*.styl')
    .pipe(watch('src/**/*.styl',function(event){
        notify("Styles Changed!");
    }))
    //.pipe(changed('app'))
    .pipe(stylus())
    .pipe(gulp.dest('app'));
});

gulp.task('default',['webserver','compileJade','compileCoffee','compileStylus','compileJsx']);
