const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const sasslint = require('gulp-sass-lint');

gulp.task('sass', () => {
	return gulp.src('./src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gulp.dest('./main/css'))
});

gulp.task('minify', () => {
	return gulp.src('./main/css/*.css')
		.pipe(clean())
		.pipe(gulp.dest('./main/css/minifiles'))
});

gulp.task('lint', () => {
	return gulp.src('./src/sass/*.scss')
		.pipe(sasslint())
		.pipe(sasslint.format())
		.pipe(sasslint.failOnError())
});

gulp.task('default', () => {
	return gulp.watch('./src/sass/*.scss', gulp.series('sass', 'minify', 'lint'));
})