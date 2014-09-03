/**
 * The router module.
 *
 * Router handles app routing and URL parameters and updates Presenter.
 *
 * @return singleton instance of Router class (extends Backbone.Router).
 */
define([
  'underscore',
  'backbone',
  'mps',
  'amplify',
  'utils',
  'services/PlaceService'
], function(_, Backbone, mps, amplify, utils, PlaceService) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      'map(/:zoom)(/:lat)(/:lng)(/:iso)(/:maptype)(/:baselayers)(/:sublayers)(/)': 'map'
    },

    initialize: function() {
      this.bind('all', this._checkForCacheBust());
      this.placeService = new PlaceService(this);
    },

    map: function(zoom, lat, lng, iso, maptype, baselayers, sublayers) {
      var params = _.extend({
        zoom: zoom,
        lat: lat,
        lng: lng,
        iso: iso,
        maptype: maptype,
        baselayers: baselayers,
        sublayers: sublayers
      }, _.parseUrl());

      this.placeService.publishNewPlace(params);
    },

    /**
     * If the URL contains the cache parameter (e.g., cache=bust), clear all
     * cached values in the browser (e.g., from memory, local storage,
     * session).
     */
    _checkForCacheBust: function() {
      var params = _.parseUrl();

      if (_.has(params, 'cache')) {
        _.each(amplify.store(), function(value, key) {
          amplify.store(key, null);
        });
      }
    },

    navigateTo: function() {
      this.navigate('map/{0}'.format(this.route), {silent: true});
    }

  });

  return Router;

});
