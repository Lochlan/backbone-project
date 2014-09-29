define(['backbone'], function (Backbone) {
    'use strict';

    var Foo = Backbone.Model.extend({
        defaults: {
            'id': undefined,
            'name': 'foo',
            'description': 'bar',
        },
    });

    return Foo;
});