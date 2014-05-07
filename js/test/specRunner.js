require.config({
    urlArgs: '_=' + (new Date()).getTime(),
    baseUrl: '../src/',
    paths: {
        jquery: '../vendor/jquery/jquery.min',
        knockout: '../vendor/knockout/build/output/knockout-latest.debug',
        underscore: '../vendor/underscore/underscore-min',
        baseviewmodel: '../vendor/baseviewmodel/baseviewmodel.min',
        'jasmine': '../test/jasmine-1.3.0/jasmine',
        'jasmine-html': '../test/jasmine-1.3.0/jasmine-html',
        specs: '../test/specs/',
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        underscore: {
            exports: '_'
        }
    }
});


require(['jquery', 'jasmine-html'], function ($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };
    
    var specs = [
        'specs/webaudio/bufferloader.spec',
        'specs/models/track.spec',
        'specs/viewmodels/track.spec',
        'specs/viewmodels/beatlab.spec'
    ];



    $(function () {
        require(specs, function (spec) {
            jasmineEnv.execute();
        });
    });

});