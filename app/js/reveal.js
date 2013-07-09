/*global Backbone, $, define */

define(['jquery', 'reveal'], function ($, Reveal) {
    'use strict';

    var RevealView = Backbone.View.extend({
        el: '.reveal',
        options: {
            width: '100%',
            height: '100%',
            maxScale: 1.0,
            rollingLinks: false,
            backgroundTransition: 'linear'
        },
        initialize: function () {
            this.reveal = Reveal;
            this.createReveal();
        },
        createReveal: function () {
            var self = this,
                reveal = this.reveal;

            function onSlideChange(e) {
                self.onRevealChange(e);
            }

            function onSlideReady() {
                self.setBtnEvents();
            }

            reveal.initialize(this.options);
            reveal.addEventListener('slidechanged', onSlideChange);
            reveal.addEventListener('ready', onSlideReady);
        },
        onRevealChange: function (e) {
            this.current = $(e.currentSlide);

            if (this.current.data('state') === 'map') {
                this.$el.addClass('disable-mouse');
            } else {
                this.$el.removeClass('disable-mouse');
            }
        },
        setBtnEvents: function () {
            var self, btn, target;

            self = this;

            function onClickBtn(e) {
                btn = $(e.target);

                if (btn.data('overlay') === true) {
                    Backbone.Mediator.publish('overlay:open', btn.attr('href'));
                    e.preventDefault();
                }
            }

            this.$el.find('.reveal-btn').on('click', onClickBtn);
        }
    });

    return RevealView;

});