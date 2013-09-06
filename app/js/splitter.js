/*global $, define, Backbone*/
define(['kendo'], function() {
    'use strict';

    var SplitterView = Backbone.View.extend({
        el: '#splitter',
        subscriptions: {
            'splitter:show': 'show',
            'splitter:hide': 'hide'
        },
        initialize: function () {
            this.$el = $(this.$el);

            this.$el.kendoSplitter({
                panes: [{
                    collapsible: false,
                    min: '50%',
                    size: '50%'
                }, {
                    collapsible: false,
                    min: '50%',
                    size: '50%'
                }]
            });
        },
        show: function () {
            this.$el.removeClass('invisible');
        },
        hide: function () {
            this.$el.addClass('invisible');
        }
    });

    return SplitterView;
});