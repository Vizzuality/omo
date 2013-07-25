/*global Backbone, L, define, cartodb */
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
            nationalparks: 'geojson/nationalparks.json'
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
            'map:zoom' : 'setMapZoom',
            'map:setView' :'setMapView'
        },
        initialize: function () {
            this.createMap();
            this.addMapEffects();
            this.$el = $('#' + this.id);
        },
        createMap: function () {
            var self = this,
                cartodbLayer;

            this.map = L.map(this.id, this.options);

            L.control.zoom({
                position: 'topright'
            }).addTo(this.map);
            if (this.id === 'mapRight') {
                cartodbLayer = cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/df4bbd86-ee1d-11e2-a56d-3085a9a9563c/viz.json');
            } else {
                cartodbLayer = cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');
            }

            cartodbLayer.on('done', function (layer) {
                self.map.addLayer(layer);

                $('.cartodb-logo').css('display', 'none');
                

            });

        },
        addMapEffects: function () {
            var self = this;

            // map effects
            if (this.id === 'map') {
                $.getJSON(self.polygons.laketurkana, function (data) {
                    var lakeStyle = {
                        'fill': 'none',
                        'weight': 5,
                        'opacity': 0,
                        'stroke': 'blue',
                        'stroke-width': 8
                    };
                    self.geolayers.laketurkana = new L.GeoJSON(data, {
                        style: lakeStyle
                    });
                    self.map.addLayer(self.geolayers.laketurkana);                    
                });
                
                $.getJSON(self.polygons.nationalparks, function (data) {
                    var parkStyle = {
                        'fill': 'none',
                        'weight': 5,
                        'opacity': 0,
                        'stroke': 'green',
                        'stroke-width': 8
                    };
                    self.geolayers.nationalparks = new L.GeoJSON(data, {
                        style: parkStyle
                    });
                    self.map.addLayer(self.geolayers.nationalparks);                    
                });
            }
        },
        show: function () {
            if (this.id === 'map') {
                this.$el.removeClass('invisible');
            }
        },
        hide: function () {
            if (this.id === 'map') {
                this.$el.addClass('invisible');
            }
        },
        featureShow: function (feature) {
            this.geolayers[feature].setStyle({
                opacity: 1
            });
            this.map.fitBounds(this.geolayers[feature].getBounds());

        },
        featureHide: function (feature) {
            console.log('hide ' + feature);
            this.geolayers[feature].resetStyle(this.geolayers[feature]);
        },
        setMapZoom: function (zoom) {
                var self = this;
             self.map.setZoom(zoom);
        },
        setMapView: function (lat,lon,zoom) {
             var self = this;
             self.map.setView([lat, lon],zoom);
             
        },
        setVis: function (vis) {
            var self = this,
                cartodbLayer;
            if (this.id === 'map') {
                cartodbLayer = cartodb.createLayer(this.map, vis);
                cartodbLayer.on('done', function (layer) {

                    self.map.addLayer(layer); 
                     $('.cartodb-logo').css('display', 'none');

                });
            }
        }
    });

    return MapView;

});