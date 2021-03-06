var typedoc = require("gulp-typedoc");
var gulp = require("gulp");
gulp.task("typedoc", function () {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            out: "docs/",
            name: "Rounded Rectangles"
        }));
});