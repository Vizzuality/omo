/*global Backbone, L, define, cartodb */
//http://saleiva-mig21.cartodb.com/api/v2/viz/552a250a-e221-11e2-af46-040102b34e01/viz.json

define(['jquery'], function ($) {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'map',
        tagName: 'div',
        cartodbLayer: null,
        visjson: 'http://saleiva-mig21.cartodb.com/api/v2/viz/b1bf1564-e23a-11e2-b1af-040102b34e01/viz.json',
        //tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        options: {
            center: [5.24, 35],
            zoom: 9,
            zoomControl: false,
            attributionControl: false
        },
        subscriptions: {
            'map:show': 'show',
            'map:hide': 'hide'
        },
        initialize: function () {
            this.createMap();
            this.$el = $('#map');
        },
        createMap: function () {
            var self = this,
                cartodbLayer;

            this.map = L.map(this.id, this.options);

            L.control.zoom({
                position: 'topright'
            }).addTo(this.map);

            //L.tileLayer(this.tileUrl).addTo(this.map);

            cartodbLayer = cartodb.createLayer(this.map, this.visjson);

            cartodbLayer.on('done', function (layer) {
                self.map.addLayer(layer);
            });
        },
        show: function () {
            this.$el.removeClass('invisible');
        },
        hide: function () {
            this.$el.addClass('invisible');
        }
    });

    return MapView;

});