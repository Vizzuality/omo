/*global Backbone, L, define, cartodb */
//http://saleiva-mig21.cartodb.com/api/v2/viz/552a250a-e221-11e2-af46-040102b34e01/viz.json

// vizzs:

// http://hrw.cartodb.com/api/v2/viz/df4bbd86-ee1d-11e2-a56d-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json

define(['jquery'], function ($) {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'mapRight',
        tagName: 'div',
        cartodbLayer: null,
        visjson: 'http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json',
        options: {
            center: [6.30165, 36.04897],
            zoom: 13,
            zoomControl: false,
            attributionControl: false
        },
        subscriptions: {
            //'map:zoom': 'setMapZoom',
            'map:setView': 'setMapView'
        },
        initialize: function () {
            this.createMap();
            this.$el = $('#' + this.id);
            this.iframe = window.self === window.top;
            if (this.iframe) {
                this.$el.addClass('iframe');
            }
        },
        createMap: function () {
            var self = this,
                cartoLayer;

            this.map = L.map(this.id, this.options);
            L.control.zoom({
                position: 'topright'
            }).addTo(this.map);

            cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/27f40324-fdb7-11e2-a933-3085a9a9563c/viz.json').addTo(this.map);

            //                L.tileLayer('http://com.vizzuality.omo.s3.amazonaws.com/basemaps/regional/{z}/{x}/{y}.png', {
            //                    attribution: 'tODO', tms: true
            //                }).addTo(this.map);

            L.tileLayer('http://com.vizzuality.omo.s3.amazonaws.com/basemaps/slide61/l3_omo_sugarblock_2013/{z}/{x}/{y}.png', {
                attribution: 'tODO',
                tms: true,
                zIndex: 10000
            }).addTo(this.map);
            cartoLayer = cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/ce602812-f9b3-11e2-9967-3085a9a9563c/viz.json');
            cartoLayer.on('done', function (layer) {
                self.map.addLayer(layer);
                self.cartodbLayer = layer;
                $('.cartodb-logo').css('display', 'none');
            });
            self.map.on('moveend', function (e) {
                Backbone.Mediator.publish('map:follow', e.target.getCenter(), e.target.getZoom());
            });
            //self.map.setZoom(16);
        },
        setMapZoom: function (zoom) {
            this.map.setZoom(zoom);
        },
        setMapView: function (lat, lon, zoom) {
            this.map.setView([lat, lon], zoom);
        }
    });

    return MapView;

});