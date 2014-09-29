define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../handlebars/nav.hbs',
], function (
    $, _, Backbone, Handlebars,
    tpl
) {
    'use strict';

    var NavView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        render: function () {
            this.template = Handlebars.compile(tpl);
            this.$el.html(this.template());
            return this;
        },

    });

    return NavView;
});