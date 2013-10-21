/*global Backbone, L, define, cartodb, _ */
//http://saleiva-mig21.cartodb.com/api/v2/viz/552a250a-e221-11e2-af46-040102b34e01/viz.json

// vizzs:
// http://hrw.cartodb.com/api/v2/viz/df4bbd86-ee1d-11e2-a56d-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json
// http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json

define(['jquery'], function($) {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'map',
        tagName: 'div',
        cartodbLayer: null,
        visjson: 'http://hrw.cartodb.com/api/v2/viz/b85b30b8-ee1c-11e2-8244-3085a9a9563c/viz.json',
        options: {
            center: [5.24, 35],
            zoom: 4,
            minZoom: 4,
            zoomControl: false,
            attributionControl: false,
            closePopupOnClick: true
        },
        polygons: {
            laketurkana: 'geojson/laketurkana.json',
            nationalparks: 'geojson/nationalparks.json',
            gibe3: null,
            sugarblocks: 'geojson/sugarblocks.json',
            privatefarms: 'geojson/privatefarms.json',
            omonew: 'geojson/omonew.json',
            irrigation: 'geojson/irrigation.json'
        },
        geolayers: {
            laketurkana: null,
            factories: []
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
        initialize: function() {
            this.createMap();
            this.addMapEffects();
            this.$el = $('#' + this.id);
            this.iframe = window.self === window.top;
            if (this.iframe) {
                this.$el.addClass('iframe');
            }
        },
        createMap: function() {
            var self = this,
                cartoLayer;
            this.map = L.map(this.id, this.options);
            L.control.zoom({
                position: 'topright'
            }).addTo(this.map);
            cartoLayer = cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');
            var scale = new L.Control.Scale({
                imperial: false,
                position: 'bottomright'
            }).addTo(this.map);
            cartoLayer.on('done', function(layer) {
                self.cartodbLayer = layer;
                self.map.addLayer(self.cartodbLayer);
            });
        },
        addMapEffects: function() {
            var self = this;

            // map effects
            $.getJSON(self.polygons.laketurkana, function(data) {
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

            $.getJSON(self.polygons.nationalparks, function(data) {
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
            $.getJSON(self.polygons.sugarblocks, function(data) {
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

            $.getJSON(self.polygons.privatefarms, function(data) {
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

            $.getJSON('http://hrw.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT%20the_geom%20FROM%20l2_eth_geo_gov_omo_factories', function(data) {
                // console.log(data);
                var factoryStyle = {
                    'color': 'orange',
                    'opacity': 1,
                    'fillOpacity': 1,
                    'fillColor': 'orange'
                };

                $.each(data.features, function(key, val) {

                    //                self.geolayers.factories[key] = new L.GeoJSON(val.geometry, {
                    //                    style: farmStyle
                    //                });
                    //self.geolayers.factories[key] = new L.Marker(val.geometry.coordinates);

                    self.geolayers.factories[key] = L.circle([val.geometry.coordinates[1], val.geometry.coordinates[0]], 5000, {
                        color: 'red',
                        opacity: 0,
                        fillColor: '#f03',
                        fillOpacity: 0
                    });

                    self.map.addLayer(self.geolayers.factories[key]);
                    //console.log(self.geolayers.factories[key]);
                });
            });

            $.getJSON(self.polygons.omonew, function(data) {
                var farmStyle = {
                    'color': 'orange',
                    'opacity': 0,
                    'fillOpacity': 0,
                    'fillColor': 'orange'

                };
                self.geolayers.omonew = new L.GeoJSON(data, {
                    style: farmStyle
                });
                self.map.addLayer(self.geolayers.omonew);

            });
            $.getJSON(self.polygons.irrigation, function(data) {
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

            self.geolayers.gibe3Popup = L.popup().setLatLng([5.6, 35.95]).setContent('<p><strong>Gibe III Dam</strong><br />about 200 km upstream.</p>');

            self.map.addLayer(self.geolayers.gibe3);
        },
        show: function() {
            this.$el.removeClass('invisible');
        },
        hide: function() {
            this.$el.addClass('invisible');
        },
        featureShow: function(feature) {
            //console.log(typeof this.geolayers[feature]);
            if (feature === 'factories') {
                var self = this;
                $.each(self.geolayers[feature], function(key, val) {
                    self.geolayers[feature][key].setStyle({
                        opacity: 0.5,
                        fillOpacity: 0.2
                    });
                });
                return;

            }

            this.geolayers[feature].setStyle({
                opacity: 0.5,
                fillOpacity: 0.7
            });
            if (feature === 'gibe3') {
                //this.map.fitBounds(this.geolayers[feature].getBounds());
                this.geolayers.gibe3Popup.openOn(this.map);

            }
        },
        featureHide: function(feature) {
            if (feature === 'factories') {
                var self = this;
                $.each(self.geolayers[feature], function(key, val) {
                    self.geolayers[feature][key].setStyle({
                        opacity: 0,
                        fillOpacity: 0
                    });
                });
                return;
            }
            this.geolayers[feature].setStyle({
                opacity: 0,
                fillOpacity: 0
            });
            if (feature === 'gibe3') this.map.closePopup(this.geolayers.gibe3Popup);
        },
        setMapZoom: function(zoom) {
            this.map.setZoom(zoom);
        },
        setMapView: function(lat, lon, zoom) {
            this.map.setView([lat, lon], zoom);
        },
        setVis: function(vis) {
            var self = this,
                cartoLayer;

            if (this.map && this.cartodbLayer) {
                this.cartodbLayer.off('featureClick');
                this.map.removeLayer(this.cartodbLayer);
                this.cartodbLayer = null;

                cartoLayer = cartodb.createLayer(this.map, vis);
                cartoLayer.on('done', function(layer) {
                    self.map.addLayer(layer);
                    self.cartodbLayer = layer;
                });
            }
        }
    });

    return MapView;

});