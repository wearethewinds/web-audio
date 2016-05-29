var gulp = require('gulp');

module.exports = function() {
    return gulp.watch('src/js/**/*.js', ['build']);
};