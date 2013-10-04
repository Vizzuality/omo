/*global Backbone, window, define */

define(['jquery', 'reveal'], function ($, Reveal) {
    'use strict';

    var RevealView = Backbone.View.extend({
        el: '.reveal',
        events: {
            'click a.disable': 'disableClick'
        },
        options: {
            width: '100%',
            height: '100%',
            maxScale: 1.0,
            rollingLinks: false,
            history: true,
            backgroundTransition: 'linear',
            transition: 'linear'
        },
        initialize: function () {
            var semiArticles = $('.semi-article');

            this.bodytag = $('body');
            this.noiframe = window.self === window.top;
            this.reveal = Reveal;
            this.logo = $('#omoLogo');
            this.fullbtn = $('.btn-full-screen');

            this.createReveal();
            this.checkIframe();
            this.setMapEffects();

            semiArticles.on('mouseover', function(e) {
                var target = $(e.currentTarget);
                semiArticles.removeClass('active');
                target.addClass('active');
                $('.slide-background.present').css('background-image', 'url(' + target.data('bg') + ')');
            });
        },
        createReveal: function () {
            var self = this,
                reveal = this.reveal;

            function onSlideChange(e) {
                self.onRevealChange(e);
            }

            function onSlideReady(e) {
                self.setBtnEvents();
                self.onRevealChange(e);
                setTimeout(function() {
                    Backbone.Mediator.publish('preload:stop');
                }, 1000);
            }

            reveal.initialize(this.options);
            reveal.addEventListener('slidechanged', onSlideChange);
            reveal.addEventListener('ready', onSlideReady);
        },
        onRevealChange: function (e) {
            $('.date-left').hide();
            $('.date-right').hide();
            this.current = $(e.currentSlide);

            Backbone.Mediator.publish('map:hide');
            Backbone.Mediator.publish('splitter:hide');

            if (this.current.data('state') === 'map1' || this.current.data('state') === 'map2' || this.current.data('state') === 'map3' || this.current.data('state') === 'map4') {
                this.$el.addClass('disable-mouse');
                Backbone.Mediator.publish('map:show');
            } else if (this.current.data('state') === 'splitter1' || this.current.data('state') === 'splitter2' || this.current.data('state') === 'splitter3') {
                $('.date-left').show();
                $('.date-right').show();
                this.$el.addClass('disable-mouse');
                Backbone.Mediator.publish('splitter:show');
            } else {
                this.$el.removeClass('disable-mouse');
            }

            switch (this.current.data('state')) {
            case 'map1':
                Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');
                Backbone.Mediator.publish('map:setView', 5.2037, 23.1106, 4);
                break;
            case 'map2':
                Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json');
                Backbone.Mediator.publish('map:setView', 5.2037, 35.8106, 9);
                break;
            case 'map3':
                Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/df4bbd86-ee1d-11e2-a56d-3085a9a9563c/viz.json');
                Backbone.Mediator.publish('map:setView', 5.3837, 35.1, 9);
                break;
            case 'splitter1':
                Backbone.Mediator.publish('map:setView', 6.18783, 35.99507, 13);
                Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/2ea71fd4-0f01-11e3-b690-3085a9a9563c/viz.json');
                break;
            case 'splitter2':
                Backbone.Mediator.publish('map:setView', 6.30165, 36.04897, 13);
                Backbone.Mediator.publish('vis:change', 'http://hrw.cartodb.com/api/v2/viz/7b5478ba-2a7a-11e3-9771-3085a9a9563c/viz.json');
                
                break;
            case 'splitter3':
                Backbone.Mediator.publish('map:setView', 6.11628, 35.99192, 14);
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

            $('#laketurkana').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'laketurkana');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'laketurkana');
            });
            
            $('#nationalparks').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'nationalparks');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'nationalparks');
            });
            
            $('#ethiopia').on('click', function (e) {
                e.preventDefault();
                Backbone.Mediator.publish('map:setView', 5.2037, 35.8106, 9);
            });
        
            $('#gibe3').on('mouseover', function () {
                //Backbone.Mediator.publish('map:setView', 6.84715651, 37.3019, 7);
                Backbone.Mediator.publish('feature:show', 'gibe3');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'gibe3');
            });
            
            $('#sugarblocks').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'sugarblocks');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'sugarblocks');
            });
            
            $('#privatefarms').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'privatefarms');
                Backbone.Mediator.publish('feature:show', 'omonew');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'privatefarms');
                Backbone.Mediator.publish('feature:hide', 'omonew');
            });
            
            $('#irrigation').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'irrigation');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'irrigation');
            });
            
            $('#factories').on('mouseover', function () {
                Backbone.Mediator.publish('feature:show', 'factories');
            }).on('mouseout', function () {
                Backbone.Mediator.publish('feature:hide', 'factories');
            });
        },
        disableClick: function(e) {
            e.preventDefault();
        },
        checkIframe: function () {
            if (this.noiframe) {
                this.fullbtn.hide();
                this.logo.show();
                this.bodytag.addClass('iframe');
            } else {
                this.fullbtn.show();
                this.logo.hide();
                this.bodytag.removeClass('iframe');
            }
        }
    });

    return RevealView;

});