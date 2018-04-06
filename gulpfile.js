'use strict'

var gulp = require('gulp');
var run = require('gulp-run');

gulp.task("runapp", function() { console.log("hello"); });
gulp.task("runserver", function() {
    run('home/ubuntu/workspace/app.js').exec(); // prints "Hello World\n". 
    // .pipe(gulp.dest('output'))    ;  // writes "Hello World\n" to output/echo. 
})

gulp.task("runcloud9", function() {
    //http://team-tree-profile-js-node-drakematfield.c9users.io:8081/
    var router = require("./router.js");
    const http = require('http');
    const hostname = '127.0.0.1';
    const port = 8081; //1331

    http.createServer(function(request, response) {
        router.home(request, response);
        router.user(request, response);

    }).listen(port);

    console.log(`Server running on port: ${port} for cloud9`);
});

gulp.task("runlocal", function() {
    //http://team-tree-profile-js-node-drakematfield.c9users.io:8081/
    var router = require("./router.js");
    const http = require('http');
    const hostname = '127.0.0.1';
    const port = 1331;

    http.createServer(function(request, response) {
        router.home(request, response);
        router.user(request, response);
    }).listen(port);

    console.log(`Server running at http://${hostname}:${port}/`);
});

gulp.task("watchserver", function() {
    gulp.watch(['/**/*.html'], ['reloadServer'])
    console.log("gulp is watching");
});

gulp.task("reloadServer", function() {

// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 8081;//1331

// http.server(port).close();


// console.log(`Server closed on port: ${port}/`);
});



//gulp.task("default", function() { console.log("hello"); });
