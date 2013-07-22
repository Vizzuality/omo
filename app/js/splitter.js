/*global define, Backbone*/
'use strict';

define(['kendo'], function() {

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
                    collapsible: true,
                    size: '50%'
                }, {
                    collapsible: true,
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