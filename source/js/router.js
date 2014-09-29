define([
    'backbone',
    'views/main',
], function (Backbone, MainView) {
    'use strict';

    var Router = Backbone.Router.extend({

        initialize: function () {
            Backbone.history.start({
                root: location.pathname,
            });
        },
        routes: {
            '': 'index',
            'search/:query': 'search',
            'search/:query/:page': 'search',
        },

        views: {
            main: new MainView({ el: 'body' }),
        },

        index: function () {
            this.views.main.render();
        },
        search: function (query, page) {
            window.console.log(query, page);
        },
    });

    return Router;
});
