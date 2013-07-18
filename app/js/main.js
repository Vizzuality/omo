/*global require*/

var dependencies = ['jquery', 'gallery', 'reveal', 'MapView', 'RevealView', 'OverlayView', 'PreloadView', 'SplitterView', 'domReady', 'kendo'];

require.config({
    baseUrl: '',
    paths: {
        domReady: 'vendor/requirejs-domready/domReady',
        jquery: 'vendor/jquery/jquery',
        reveal: 'lib/reveal.js/js/reveal',
        gallery: 'lib/jquery/gallery',
        kendo: 'vendor/kendo/js/kendo.web.min',

        MapView: 'js/map',
        RevealView: 'js/reveal',
        OverlayView: 'js/overlay',
        PreloadView: 'js/preload',
        SplitterView: 'js/splitter'
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
        domReady: {
            exports: 'domReady'
        },
        kendo: {
            exports: 'kendo'
        }
    }
});

require(dependencies, function ($, gallery, Reveal, MapView, RevealView, OverlayView, PreloadView, SplitterView, domReady) {
    'use strict';

    var app = {};

    function initialize() {

        app.preloadView = new PreloadView();
        app.revealView = new RevealView();
        app.splitterView = new SplitterView();
        app.mapView = new MapView();
        app.mapLeftView = new MapView({
            id: 'mapLeft'
        });
        app.mapRightView = new MapView({
            id: 'mapRight'
        });
        app.overlayView = new OverlayView();

    }

    domReady(initialize);
});