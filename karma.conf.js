module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        'www/lib/angular/angular.js',  
        'www/lib/angular-mocks/angular-mocks.js',  
        'www/lib/angular-scenario/angular-scenario.js',
        'www/lib/angular-sanitize/angular-sanitize.min.js',  
        'www/lib/angular-ui-router/release/angular-ui-router.js',  
        // 'www/lib/ionic/js/ionic.js  ',
        // 'www/lib/ionic/js/ionic-angular.min.js',
        // 'www/js/**/*.js',
        'tests/unit/controllers/*.js'
    ],

    // web server port
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ 'Chrome'],
    plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],
    singleRun: true
  });
};
