/*global cartodb, require*/

var dependencies = ['jquery', 'gallery', 'reveal', 'MapView', 'RevealView', 'OverlayView', 'PreloadView', 'domReady'];

require.config({
    baseUrl: '',
    paths: {
        domReady: 'vendor/requirejs-domready/domReady',
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
        },
        domReady: {
            exports: 'domReady'
        }
    }
});

require(dependencies, function ($, gallery, Reveal, MapView, RevealView, OverlayView, PreloadView, domReady) {
    'use strict';

    var app = {};

    function initialize() {

        app.preloadView = new PreloadView();
        app.revealView = new RevealView();
        app.mapView = new MapView();
        app.overlayView = new OverlayView();

    }

    domReady(initialize);
});