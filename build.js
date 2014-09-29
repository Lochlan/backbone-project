({
    baseUrl: 'source/js/',
    paths: {
        'backbone': 'vendor/backbone',
        'handlebars': 'vendor/handlebars',
        'jquery': 'vendor/jquery',
        'text': 'vendor/text',
        'underscore': 'vendor/underscore',
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
        },
        handlebars: {
            exports: 'Handlebars',
        },
        jquery: {
            exports: '$',
        },
        underscore: {
            exports: '_',
        },
    },
    name: "main",
    out: "assets/js/main.js",
    removeCombined: true
})