/**
 * The Cartodb map layer module.
 * @return CartoDBLayerClass (extends Class).
 */
define([
  'Class',
  'underscore',
  'uri',
  'text!cartocss/style.cartocss'
], function(Class, _, UriTemplate, CARTOCSS) {

  'use strict';

  var CartoDBLayerClass = Class.extend({

    options: {
      user_name: 'wri-01',
      type: 'cartodb'
    },

    cartocss: CARTOCSS,

    queryTemplate: "SELECT cartodb_id||':' ||'{tableName}' as cartodb_id, the_geom_webmercator," +
      "'{tableName}' AS name FROM {tableName}",

    init: function(layer, map) {
      this.cdbLayer = null;
      this.layer = layer;
      this.map = map;
      this.name = layer.slug;
      this.layerOrder = this.layerOrder || null;
    },

    getLayer: function() {
      var deferred = new $.Deferred();

      cartodb.createLayer(this.map, _.extend(this.options, {
        sublayers: [{
          sql: this.getQuery(),
          cartocss: this.cartocss
        }]
      }))
      .done(
        _.bind(function(layer) {
          this.cdbLayer = layer;
          deferred.resolve(this.cdbLayer);
        }, this)
      ).error(function(err) {
        throw err;
      });

      return deferred.promise();
    },

    updateTiles: function() {
      this.cdbLayer.setQuery(this.getQuery());
    },

    /**
     * Get the CartoDB query. If it isn't set on this.options,
     * it gets the default query from this._queryTemplate.
     *
     * @return {string} CartoDB query
     */
    getQuery: function() {
      return this.options.sql ||
        new UriTemplate(this.queryTemplate).fillFromObject({tableName: this.layer.table_name});
    }

  });

  return CartoDBLayerClass;
});
