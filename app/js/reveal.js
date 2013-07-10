/*global Backbone, window, $, define */

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
            this.iframe = window.self === window.top;
            this.reveal = Reveal;
            this.logo = $('#omoLogo');

            this.createReveal();
            this.checkIframe();
        },
        createReveal: function () {
            var self = this,
                reveal = this.reveal;

            function onSlideChange(e) {
                self.onRevealChange(e);
            }

            function onSlideReady() {
                self.setBtnEvents();
                Backbone.Mediator.publish('preload:stop');
            }

            reveal.initialize(this.options);
            reveal.addEventListener('slidechanged', onSlideChange);
            reveal.addEventListener('ready', onSlideReady);
        },
        onRevealChange: function (e) {
            this.current = $(e.currentSlide);

            if (this.current.data('state') === 'map') {
                this.$el.addClass('disable-mouse');
                Backbone.Mediator.publish('map:show');
            } else {
                this.$el.removeClass('disable-mouse');
                Backbone.Mediator.publish('map:hide');
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
        },
        checkIframe: function () {
            if (this.iframe) {
                this.logo.show();
            } else {
                this.logo.hide();
            }
        }
    });

    return RevealView;

});