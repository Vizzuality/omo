/*global cartodb, require*/

var dependencies = ['jquery', 'gallery', 'reveal', 'MapView', 'RevealView', 'OverlayView', 'PreloadView'];

require.config({
    baseUrl: '',
    paths: {
        jquery: 'vendor/jquery/jquery',
        reveal: 'lib/reveal.js/js/reveal',
        gallery: 'lib/jquery/gallery',

        MapView: 'js/map',
        RevealView: 'js/reveal',
        OverlayView: 'js/overlay',
        PreloadView: 'js/preload'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        gallery: {
            deps: ['jquery'],
            exports: '$.fn.gallery'
        },
        reveal: {
            exports: 'Reveal'
        },
        MapView: {
            exports: 'MapView'
        },
        RevealView: {
            exports: 'RevealView'
        },
        PreloadView: {
            exports: 'PreloadView'
        }
    }
});

require(dependencies, function ($, gallery, Reveal, MapView, RevealView, OverlayView, PreloadView) {
    'use strict';

    var app = {};

    function initialize() {

        app.preloadView = new PreloadView();
        app.revealView = new RevealView();
        app.mapView = new MapView();
        app.overlayView = new OverlayView();

    }

    $(function() {
        initialize();
    });
});