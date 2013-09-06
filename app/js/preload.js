/*global define, Backbone, Spinner */

define([], function () {
    'use strict';

    var PreloadView = Backbone.View.extend({
        el: '#preload',
        options: {
            lines: 13, // The number of lines to draw
            length: 15, // The length of each line
            width: 5, // The line thickness
            radius: 15, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#fff', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        },
        subscriptions: {
            'preload:start': 'start',
            'preload:stop': 'stop'
        },
        initialize: function () {
            this.spinner = new Spinner(this.options);
            this.spinner.spin(this.el);
        },
        start: function () {
            this.$el.fadeIn();
            this.spinner.spin(this.el);
        },
        stop: function () {
            this.spinner.stop();
            this.$el.fadeOut();
        }
    });

    return PreloadView;

});