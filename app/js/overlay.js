/*global Backbone, $, define */

define([], function () {
    'use strict';

    var OverlayView = Backbone.View.extend({
        el: '#overlay',
        subscriptions: {
            'overlay:open': 'open'
        },
        events: {
            'click #closeOverlayBtn': 'close'
        },
        initialize: function () {
            this.content = $('#contentOverlay');
        },
        render: function (data) {
            this.content.html(data);
        },
        open: function (target) {
            var contentHtml = $(target).html();

            this.render(contentHtml);
            this.$el.fadeIn('fast');

            $(this.$el.find('.gallery')).gallery();
        },
        close: function () {
            this.$el.fadeOut('fast');
            this.content.empty();
        }
    });

    return OverlayView;

});