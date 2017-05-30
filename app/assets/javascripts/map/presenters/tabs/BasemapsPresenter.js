/**
 * The BasemapsPresenter class for the BasemapsPresenter view.
 *
 * @return BasemapsPresenter class.
 */
define([
  'underscore',
  'mps',
  'map/presenters/PresenterClass',
  'map/services/LayerSpecService'
], function(_, mps, PresenterClass, layerSpecService) {

  'use strict';

  var BasemapsPresenter = PresenterClass.extend({

    init: function(view) {
      this.view = view;
      this._super();
    },

    /**
     * Application subscriptions.
     */
    _subscriptions: [{
      'Map/maptype-change': function(maptype) {
        this.view.selectMaptype(maptype);
      }
    }],

    initExperiment: function(id){
      mps.publish('Experiment/choose',[id]);
    },

    setMaptype: function(maptype) {
      mps.publish('Maptype/change', [maptype]);
    },

    /**
     * Publish a a Map/toggle-layer.
     *
     * @param  {string} layerSlug
     */
    toggleLayer: function(layerSlug) {
      var where = [{slug: layerSlug}];

      layerSpecService.toggle(where,
        _.bind(function(layerSpec) {
          mps.publish('LayerNav/change', [layerSpec]);
          mps.publish('Place/update', [{go: false}]);
        }, this));
    },
  });

  return BasemapsPresenter;
});
