const { 
	src, dest 
} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

exports.default = function(){
	return src('./lin_js/*.js')		// 路径问题：gulpfile.js为路径的起点。此路径表示js文件下的所有js文件。
		.pipe(babel({
			 presets: ['@babel/env']//es6转es5
		}))
		.pipe(concat('lin.js'))		//合并成的js文件名称
	    .pipe(uglify())				//压缩
	    .pipe(dest('dist'));		//打包压缩在build目录下。
}