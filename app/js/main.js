/*global cartodb, require*/

var dependencies = ['jquery', 'gallery', 'reveal', 'MapView', 'RevealView', 'OverlayView'];

require.config({
    baseUrl: '',
    paths: {
        jquery: 'vendor/jquery/jquery',
        reveal: 'lib/reveal.js/js/reveal',
        gallery: 'lib/jquery/gallery',

        MapView: 'js/map',
        RevealView: 'js/reveal',
        OverlayView: 'js/overlay'
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
        }
    }
});

require(dependencies, function ($, gallery, Reveal, MapView, RevealView, OverlayView) {
    'use strict';

    var app = {};

    function initialize() {

        app.revealView = new RevealView();
        app.mapView = new MapView();
        app.overlayView = new OverlayView();

    }

    $(initialize); // DOM Ready
});