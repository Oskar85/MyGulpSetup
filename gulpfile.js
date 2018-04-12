//'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var spritesmash = require('gulp-spritesmash');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass',
    imgPath: '../sprite/sprite.png',
    algorithm: 'binary-tree',
    padding: 2
  }));
  return spriteData.pipe(gulp.dest('build/sprite/'));
});
 
gulp.task('html', function () {
 return gulp.src('build/index.html')
  	.pipe(browserSync.stream());
});

gulp.task('js', function () {
 return gulp.src('src/js/*.js')
  	.pipe(gulp.dest('build/js/'))
  	.pipe(browserSync.stream());
});

gulp.task('img', function () {
 return gulp.src('src/img/*.*')
  	.pipe(gulp.dest('build/img/'))
  	.pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('src/sass/*.*')
		    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		    .pipe(autoprefixer())
		    .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});


gulp.task('serve', function() {

    browserSync.init({
        server: {
        	baseDir:'./build'
        },
        browser: "chrome"
    });

});

gulp.task('watch', function(){
    gulp.watch("src/sass/*.sass", gulp.series('sass'))
    gulp.watch('build/index.html', gulp.series('html'))
    gulp.watch("src/js/*.js", gulp.series('js'))
    gulp.watch("src/img/*.*", gulp.series('img'))
});
		
gulp.task('default', gulp.series(
    gulp.parallel('serve', 'watch', 'img'),
    gulp.parallel('html', 'sass', 'js')
));