var gulp=require('gulp');
var useref=require('gulp-useref');/*合并文件*/
var uglify=require('gulp-uglify');/*压缩js*/
var babel = require('gulp-babel');
var concat = require('gulp-concat');
// var rev=require('gulp-rev');/*给文件用哈希码添加版本号*/
// var revReplace=require('gulp-rev-replace');/*更新引用*/
// var filter=require('gulp-filter');/*过滤器：筛选，恢复*/
// var csso=require('gulp-csso');/*压缩css*/
 
gulp.task('default', () => {
    return gulp.src('./lin_js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('lin.js'))
        .pipe(useref())
        .pipe(uglify())
        .pipe(gulp.dest('dest'));
});

// gulp-useref gulp-uglify gulp-babel gulp-concat gulp-rev gulp-rev-replace gulp-filter gulp-csso babel-preset-es2015