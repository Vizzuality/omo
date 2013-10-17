/*global require*/

require.config({
    baseUrl: '',
    paths: {
        jquery: 'vendor/jquery/jquery',
        reveal: 'lib/reveal.js/js/reveal',
        gallery: 'lib/jquery/gallery',
        kendo: 'vendor/kendo-ui/js/kendo.web.min',

        MapView: 'js/maps/main',
        MapLeftView: 'js/maps/left',
        MapRightView: 'js/maps/right',
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

require([
    'jquery', 'gallery', 'reveal', 'MapView', 'MapLeftView', 'MapRightView', 'RevealView', 'OverlayView', 'PreloadView', 'SplitterView', 'kendo'
], function ($, gallery, Reveal, MapView, MapLeftView, MapRightView, RevealView, OverlayView, PreloadView, SplitterView) {
    'use strict';

    var app = {};

    app.preloadView = new PreloadView();
    app.revealView = new RevealView();
    app.splitterView = new SplitterView();
    app.mapView = new MapView();
    app.mapLeftView = new MapLeftView();
    app.mapRightView = new MapRightView();
    app.overlayView = new OverlayView();

});