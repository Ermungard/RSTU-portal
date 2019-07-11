var path = require('path'),
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    gutil = require('gulp-util'),
    gls = require('gulp-live-server'),
    del = require('del'),
    jsdoc = require('gulp-jsdoc3'),
    apidoc = require('gulp-apidoc'),
    run = require('gulp-run');

gulp.task('client:setup', function() {
    return run('yarn', { cwd: './client', verbosity: 3 }).exec();
});

gulp.task('client:dev', function() {
    return run('yarn run dev', { cwd: './client', verbosity: 3 }).exec();
});

gulp.task('client:dev', function() {
    return run('yarn run build', { cwd: './client', verbosity: 3 }).exec();
});

gulp.task('server:ts:build', function() {
    var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));

    return gulp.src(path.resolve('./server/**/*.ts'))
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(path.resolve('./server')));
});

gulp.task('server:ts:watch', ['server:ts:build'], function() {
    gulp.watch('./server/**/*.ts', ['server:ts:build']);
});

gulp.task('server:watch', ['server:ts:watch'], function() {
    var server = gls.new('./server/server.js');
    server.start();
    gulp.watch('./server/server.js', function() {
        server.start.bind(server)();
    });
});

gulp.task('server:clean', function() {
    return del([
        'server/**/*.js',
        'server/**/*.map'
    ])
});

gulp.task('server:docs:clean', function() {
    return del([
        'server/docs',
    ])
});

gulp.task('server:jsdoc:build', ['server:clean', 'server:docs:clean', 'server:ts:build'], function(cb) {
    gulp.src(['README.md', 'server/**/*.js'], { read: false })
        .pipe(jsdoc(require('./server/.jsdoc.json'), cb));
});

gulp.task('server:apidoc:build', ['server:clean', 'server:docs:clean', 'server:ts:build'], function(cb) {
    apidoc(require('./server/apidoc.json'), cb);
});