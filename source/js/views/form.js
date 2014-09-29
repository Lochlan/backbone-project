define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!../../handlebars/form.hbs',
], function (
    $, _, Backbone, Handlebars,
    tpl
) {
    'use strict';

    var FormView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        render: function () {
            this.template = Handlebars.compile(tpl);
            this.$el.html(this.template());
            return this;
        },
        events: {
            'submit': 'submit',
        },
        submit: function (event) {
            event.preventDefault();

            var formSerializedArray = this.$('form').serializeArray();
            var formObjectArray = _(formSerializedArray).map(function (input) {
                return [input.name, input.value];
            });
            var formObject = _(formObjectArray).object();

            this.model.set(formObject);
        },

    });

    return FormView;
});