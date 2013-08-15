/*global Backbone, L, define, cartodb, _ */
//http://saleiva-mig21.cartodb.com/api/v2/viz/552a250a-e221-11e2-af46-040102b34e01/viz.json

// vizzs:
// http://hrw.cartodb.com/api/v2/viz/df4bbd86-ee1d-11e2-a56d-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json

define(['jquery'], function ($) {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'map',
        tagName: 'div',
        cartodbLayer: null,
        visjson: 'http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json',
        options: {
            center: [5.24, 35],
            zoom: 9,
            zoomControl: false,
            attributionControl: false
        },
        polygons: {
            laketurkana: 'geojson/laketurkana.json',
            nationalparks: 'geojson/nationalparks.json',
            gibe3: null,
            sugarblocks: 'geojson/sugarblocks.json',
            privatefarms: 'geojson/privatefarms.json',
            irrigation: 'geojson/irrigation.json'
        },
        geolayers: {
            laketurkana: null
        },
        subscriptions: {
            'map:show': 'show',
            'map:hide': 'hide',
            'feature:show': 'featureShow',
            'feature:hide': 'featureHide',
            'vis:change': 'setVis',
            //'map:zoom': 'setMapZoom',
            'map:setView': 'setMapView',
            //'map:follow': 'followMasterMap'
        },
        initialize: function () {
            this.createMap();
            this.addMapEffects();
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
            cartoLayer = cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');
            cartoLayer.on('done', function (layer) {
                self.cartodbLayer = layer;
                self.map.addLayer(self.cartodbLayer);
                $('.cartodb-logo').css('display', 'none');
            });
        },
        addMapEffects: function () {
            var self = this;

            // map effects
            $.getJSON(self.polygons.laketurkana, function (data) {
                var lakeStyle = {
                    'color': 'blue',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'blue'
                };
                self.geolayers.laketurkana = new L.GeoJSON(data, {
                    style: lakeStyle
                });
                self.map.addLayer(self.geolayers.laketurkana);
            });

            $.getJSON(self.polygons.nationalparks, function (data) {
                var parkStyle = {
                    'color': 'green',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'green'
                };
                self.geolayers.nationalparks = new L.GeoJSON(data, {
                    style: parkStyle
                });
                self.map.addLayer(self.geolayers.nationalparks);
            });
            $.getJSON(self.polygons.sugarblocks, function (data) {
                var sugarStyle = {
                    'color': 'green',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'green'
                };
                self.geolayers.sugarblocks = new L.GeoJSON(data, {
                    style: sugarStyle
                });
                self.map.addLayer(self.geolayers.sugarblocks);
            });

            $.getJSON(self.polygons.privatefarms, function (data) {
                var farmStyle = {
                    'color': 'orange',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'orange'

                };
                self.geolayers.privatefarms = new L.GeoJSON(data, {
                    style: farmStyle
                });
                self.map.addLayer(self.geolayers.privatefarms);
            });

            $.getJSON(self.polygons.irrigation, function (data) {
                var iStyle = {
                    'color': 'red',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'red'
                };
                self.geolayers.irrigation = new L.GeoJSON(data, {
                    style: iStyle
                });
                self.map.addLayer(self.geolayers.irrigation);
            });

            self.geolayers.gibe3 = L.circle([6.84715651, 37.30191447], 5000, {
                color: 'red',
                opacity: 0,
                fillColor: '#f03',
                fillOpacity: 0
            });

            self.map.addLayer(self.geolayers.gibe3);
        },
        show: function () {
            this.$el.removeClass('invisible');
        },
        hide: function () {
            this.$el.addClass('invisible');
        },
        featureShow: function (feature) {
            console.log(this.geolayers[feature]);
            this.geolayers[feature].setStyle({
                opacity: 0.5,
                fillOpacity: 0.7
            });
            if (feature !== 'gibe3') {
                //this.map.fitBounds(this.geolayers[feature].getBounds());
            }
        },
        featureHide: function (feature) {
            this.geolayers[feature].setStyle({
                opacity: 0,
                fillOpacity: 0
            });
        },
        setMapZoom: function (zoom) {
            this.map.setZoom(zoom);
        },
        setMapView: function (lat, lon, zoom) {
            this.map.setView([lat, lon], zoom);
        },
        setVis: function (vis) {
            var self = this,
                cartoLayer;
            if (this.map && this.cartodbLayer) {
                this.map.removeLayer(this.cartodbLayer);
                this.cartodbLayer = null;
            }
            cartoLayer = cartodb.createLayer(this.map, vis);
            cartoLayer.on('done', function (layer) {
                self.map.addLayer(layer);
                self.cartodbLayer = layer;
                $('.cartodb-logo').css('display', 'none');
            });
        }
    });

    return MapView;

});