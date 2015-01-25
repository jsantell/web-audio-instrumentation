var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var manifest = require("./package.json");
var name = manifest.name;

gulp.task("default", function() {
  browserify({ standalone: "WebAudioInstrumentation" }).add("./index.js")
  .bundle()
  .on("error", gutil.log.bind(gutil, "Browserify Error"))
  .pipe(source(name + ".js"))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
  .pipe(sourcemaps.write("./")) // writes .map file
  .pipe(gulp.dest("./build"));
});

