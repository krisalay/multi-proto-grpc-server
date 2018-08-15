module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./lib"
        }],
        options: {
          experimentalDecorators: true,
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
        }
      }
    },
    watch: {
      scripts: {
        ts: {
          files: ["src/\*\*/\*.ts"],
          tasks: ["ts"]
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: ["./\*\*/\*.proto"], dest: './lib/' },
          { expand: true, cwd: 'src/', src: ["./\*\*/\*.sh"], dest: './dist/' },
          { expand: true, cwd: 'src/', src: ["./\*\*/\*.md"], dest: './dist/' },
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "ts", "copy:main"
  ]);
};
