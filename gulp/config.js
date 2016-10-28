// "./" 指的是项目主目录
// "./" 指的是项目主目录
var src = './app/public';
var dest = src;
module.exports = {
    sass: {
        src:  src + "/scss/**/*.scss",	 //需要编译的scss
        dest: dest + "/css"	   //输出目录
    }
};