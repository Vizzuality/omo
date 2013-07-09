/*global Backbone, L, define */

define([], function () {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'map',
        tagName: 'div',
        tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        options: {
            center: [51.505, -0.09],
            zoom: 12,
            zoomControl: false,
            attributionControl: false
        },
        initialize: function () {
            this.createMap();
        },
        createMap: function () {
            this.map = L.map(this.id, this.options);
            L.control.zoom({ position: 'topright' }).addTo(this.map);
            L.tileLayer(this.tileUrl).addTo(this.map);
        }
    });

    return MapView;

});