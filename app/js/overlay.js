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
            this.setBtnEvents();
        },
        open: function (target) {
            var contentHtml = $(target).html();

            this.render(contentHtml);
            this.$el.fadeIn('fast');

            $(this.$el.find('.gallery')).gallery();
        },
        close: function (e) {
            e.preventDefault();
            this.$el.fadeOut('fast');
            this.content.empty();
        },
         setBtnEvents: function () {
            var self, btn;

            self = this;

            function onClickBtn(e) {
                console.log('overlay');
                btn = $(e.target);
                if (btn.data('overlay') === true) {
                    self.open(btn.attr('href'));
                    //Backbone.Mediator.publish('overlay:open', btn.attr('href'));
                    e.preventDefault();
                }
            }

            this.$el.find('a').on('click', onClickBtn);
        }
    });

    return OverlayView;

});