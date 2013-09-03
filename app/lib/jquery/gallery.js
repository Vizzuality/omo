/*global jQuery*/

(function ($) {
    'use strict';

    var defaults, Gallery;

    defaults =  {
        width: 666,
        velocity: 1000
    };

    Gallery = function (el, options) {
        var $el, settings, methods, counter, self, panels, wrap, galleryWidth, viewer, len, left;

        $el = $(el);
        wrap = $el.find('.gallery-wrap');
        panels = $el.find('.gallery-panel');
        viewer = $el.find('.gallery-viewer');

        self = this;
        settings = $.extend(defaults, options);
        counter = 0;
        galleryWidth = $el.width();
        len = panels.length;

        this.move = function (dir) {
            if (dir === 'next') {
                counter = counter + 1;
                if (counter === len) {
                    counter = len - 1;
                }
            } else if (dir === 'prev') {
                counter = counter - 1;
                if (counter < 0) {
                    counter = 0;
                }
            }

            left = -(counter * settings.width) + ((galleryWidth - settings.width) / 2);

            wrap.css('left', left);
        };

        this.viewer = function (e) {
            var videoUrl = $(e.currentTarget).attr('href');

            viewer.html('<iframe width="100%" height="100%" src="' + videoUrl + '" type="text/html" frameborder="0" allowfullscreen></iframe>')
                .show();

            e.preventDefault();
        };

        this.initialize = function () {

            $el.find('.gallery-next').on('click', function (e) {
                self.move('next');
                e.preventDefault();
            });

            $el.find('.gallery-prev').on('click', function (e) {
                self.move('prev');
                e.preventDefault();
            });

            panels.find('a[data-video="true"]').on('click', this.viewer);

            this.move();

            return $el;
        };

        return this.initialize();
    };

    $.fn.gallery = function (options) {
        return this.each(function () {
            return new Gallery(this, options);
        });
    };

    return $.fn.gallery;

}(jQuery));