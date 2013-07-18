/*global Backbone, window, $, define */

define(['jquery', 'reveal'], function ($, Reveal) {
    'use strict';

    var RevealView = Backbone.View.extend({
        el: '.reveal',
        options: {
            width: '100%',
            height: '100%',
            maxScale: 1.0,
            rollingLinks: true,
            history: true,
            backgroundTransition: 'linear'
        },
        initialize: function () {
            this.iframe = window.self === window.top;
            this.reveal = Reveal;
            this.logo = $('#omoLogo');

            this.createReveal();
            this.checkIframe();
            this.setMapEffects();
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

            if (this.current.data('state') === 'map1' || this.current.data('state') === 'map2' || this.current.data('state') === 'map3') {
                this.$el.addClass('disable-mouse');
                Backbone.Mediator.publish('splitter:hide');
                Backbone.Mediator.publish('map:show');
            } else if (this.current.data('state') === 'splitter') {
                this.$el.addClass('disable-mouse');
                Backbone.Mediator.publish('map:hide');
                Backbone.Mediator.publish('splitter:show');
            } else {
                this.$el.removeClass('disable-mouse');
                Backbone.Mediator.publish('map:hide');
            }
            
            switch (this.current.data('state')){
               case 'map1':
               Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');                  
               break;
               case 'map2':
               Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json');                  
               break;
                
            }
        },
        setBtnEvents: function () {
            var self, btn;

            self = this;

            function onClickBtn(e) {
                btn = $(e.target);
                if (btn.data('overlay') === true) {
                    Backbone.Mediator.publish('overlay:open', btn.attr('href'));
                    e.preventDefault();
                }
            }

            this.$el.find('a').on('click', onClickBtn);
        },
        setMapEffects: function () {
            var self;

            self = this;

            $('#laketurkana').on('mouseover', function(){Backbone.Mediator.publish('feature:show', 'laketurkana');});
            $('#laketurkana').on('mouseout', function(){Backbone.Mediator.publish('feature:hide', 'laketurkana');});
        },

        checkIframe: function () {
            if (this.iframe) {
                this.logo.show();
                this.$el.addClass('iframe');
            } else {
                this.logo.hide();
                this.$el.removeClass('iframe');
            }
        }
    });

    return RevealView;

});