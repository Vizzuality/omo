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
            'map:zoom' : 'setMapZoom',
            'map:setView' :'setMapView',
            'map:follow' : 'followMasterMap'
        },
        initialize: function () {
            this.createMap();
            this.addMapEffects();
            this.$el = $('#' + this.id);
        },
        createMap: function () {
            var self = this,cartoLayer;

            if (this.id === 'mapLeft') {
                this.map= L.map(this.id, this.options);
                cartoLayer=cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/ce602812-f9b3-11e2-9967-3085a9a9563c/viz.json');
                cartoLayer.on('done', function (layer) {
                    self.map.addLayer(layer);
                    self.cartodbLayer = layer;
                    $('.cartodb-logo').css('display', 'none');              
                });
            
                
            }else if (this.id === 'mapRight') {
                
                this.map= L.map(this.id, this.options);
                L.control.zoom({
                    position: 'topright'
                }).addTo(this.map);
                cartoLayer=cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/15aa9b8e-f86b-11e2-8305-3085a9a9563c/viz.json');
                cartoLayer.on('done', function (layer) {
                    self.map.addLayer(layer);
                    self.cartodbLayer = layer;
                    $('.cartodb-logo').css('display', 'none');              
                });
                self.map.on('move', function(e){Backbone.Mediator.publish('map:follow',e.target.getCenter(),e.target.getZoom()); });
                
            } else {
                this.map = L.map(this.id, this.options);
                L.control.zoom({
                    position: 'topright'
                }).addTo(this.map);
                cartoLayer=cartodb.createLayer(this.map, 'http://hrw.cartodb.com/api/v2/viz/964ea6f8-ee0d-11e2-a7a6-3085a9a9563c/viz.json');
                cartoLayer.on('done', function (layer) {
                    self.map.addLayer(layer);
                    self.cartodbLayer = layer;
                    $('.cartodb-logo').css('display', 'none');              
                });
            }

            

        },
        addMapEffects: function () {
            var self = this;

            // map effects
            if (this.id === 'map') {
                $.getJSON(self.polygons.laketurkana, function (data) {
                    var lakeStyle = {
                        'color': 'blue',
                        'opacity':0,
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
                        'opacity':0,
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
                        'opacity':0,
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
                        'opacity':0,
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
                        'opacity':0,
                        'fillOpacity': 0,
                        'fillColor': 'red'
                      
                    };
                    self.geolayers.irrigation = new L.GeoJSON(data, {
                        style: iStyle
                    });
                    self.map.addLayer(self.geolayers.irrigation);                    
                });
                
                self.geolayers.gibe3 = L.circle([ 6.84715651, 37.30191447], 5000, {
                    color: 'red',
                    opacity:0,
                    fillColor: '#f03',
                    fillOpacity: 0
                });
                self.map.addLayer(self.geolayers.gibe3); 
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
                opacity: 0.5,
                fillOpacity: 0.7
            });
            if (feature!='gibe3') this.map.fitBounds(this.geolayers[feature].getBounds());

        },
        featureHide: function (feature) {
            console.log('hide ' + feature);
            //this.geolayers[feature].resetStyle(this.geolayers[feature]);
            
            this.geolayers[feature].setStyle({
                opacity: 0,
                fillOpacity: 0
            });
        },
        setMapZoom: function (zoom) {
                var self = this;
             self.map.setZoom(zoom);
        },
        setMapView: function (lat,lon,zoom) {
             var self = this;
             self.map.setView([lat, lon],zoom);
             
        },
        followMasterMap: function (latlon,zoom){
            if (this.id === 'mapLeft') this.map.setView(latlon,zoom);
        },
        setVis: function (vis) {
            var self = this, cartoLayer;
            if (this.id === 'map') {
                console.log(self.map.getPanes().tilePane);
                self.map.removeLayer(self.cartodbLayer);
                cartoLayer = cartodb.createLayer(this.map, vis);
                cartoLayer.on('done', function (layer) {

                    self.map.addLayer(layer); 
                    self.cartodbLayer =layer;
                     $('.cartodb-logo').css('display', 'none');

                });
            }
        }
    });

    return MapView;

});