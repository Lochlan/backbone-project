(function () {
    'use strict';
    require.config({
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
    });

    require([
        'router',
    ], function (Router) {
        new Router();
    });

} ());
