module.exports = function(grunt) {

    // Instalação de cada plugin
    // npm install grunt-contrib-clean --save-dev
    // npm install grunt-contrib-jshint --save-dev
    // npm install grunt-contrib-concat --save-dev
    // npm install grunt-contrib-uglify --save-dev
    // npm install grunt-contrib-cssmin --save-dev
    // npm install grunt-contrib-htmlmin --save-dev
    // npm install grunt-contrib-copy --save-dev

    // Configuração de cada plugin
    grunt.initConfig({

        clean: {
            all: ['temp/']
        },

        jshint: {
            files: {
                src: ['src/**/*.js']
            }
        },

        uglify: {
            options: {
              mangle: false
            },
            files: {
                files: {
                    'temp/sizecheckr.js': ['src/sizecheckr.js'],
                    'temp/sizecheckr-engine.js': ['src/sizecheckr-engine.js']
                }
            }
        },

        cssmin: {
            files: {
                files: {
                    'temp/sizecheckr.css': ['src/sizecheckr.css'],
                    'temp/sizecheckr-engine.css': ['src/sizecheckr-engine.css']
                }
            }
        },

        copy: {
            all: {
                files: {
                    '../sizecheckr/sizecheckr.js': ['temp/sizecheckr.js'],
                    '../sizecheckr/server/js/sizecheckr-engine.js': ['temp/sizecheckr-engine.js'],
                    '../sizecheckr/sizecheckr.css': ['temp/sizecheckr.css'],
                    '../sizecheckr/server/css/sizecheckr-engine.css': ['temp/sizecheckr-engine.css']
                }
            }
        }
    });

  // Carrega os plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tarefas
  // chamando 'grunt default' processa todas as tarefas configiradas
  grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'cssmin', 'copy', 'clean']);

};
