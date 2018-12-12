const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha-phantomjs');
const rename = require('gulp-rename');
const header = require('gulp-header');
const scsslint = require('gulp-scss-lint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();
const webpackConfig = require('./webpack.config.js');
const testWebpackConfig = require('./webpack.test.config.js');
const pkg = require('./package.json');

const banner = '/*! <%= pkg.name %> - v<%= pkg.version %> | <%= new Date().getFullYear() %> */\n';

gulp.task('build', () => (
    gulp.src(['./src/index.js'])
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./dist/'))
));

gulp.task('build-min', ['build'], () => (
    gulp.src(['./src/index.js'])
        .pipe(webpackStream({
            ...webpackConfig,
            mode: 'production',
        }, webpack))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(header(banner, { pkg }))
        .pipe(gulp.dest('./dist/'))
));

gulp.task('default', ['build-min']);
