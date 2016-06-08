var gulp=require('gulp');
var concat=require('gulp-concat');
var babel=require('gulp-babel');
var sourcemaps=require('gulp-sourcemaps');
var uglify=require('gulp-uglify');

gulp.task("default", function () {
  return gulp.src("js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});