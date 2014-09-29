define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/foo',
    'views/form',
    'views/nav',
    'text!../../handlebars/index.hbs',
], function (
    $, _, Backbone, Handlebars,
    Foo,
    FormView,
    NavView,
    tpl
) {
    'use strict';

    var MainView = Backbone.View.extend({
        initialize: function () {
            this.subviews.form.model = this.model;
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.template = Handlebars.compile(tpl);

            this.$el.html(this.template({
                foo: this.model.attributes,
            }));

            _(this.subviews).each(function (subview) {
                subview.setElement(subview.$el.selector);
                subview.render();
            });

            return this;
        },
        model: new Foo(),
        subviews: {
            form: new FormView({ el: '.js-form' }),
            navigation: new NavView({ el: '.js-nav' }),
        },

    });

    return MainView;
});