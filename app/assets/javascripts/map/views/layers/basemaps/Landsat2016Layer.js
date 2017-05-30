/**
 * The Landsat 2016 layer module.
 *
 * @return Landsat 2016 class (extends ImageLayerClass)
 */
define([
  'abstract/layer/ImageLayerClass',
], function(ImageLayerClass) {

  'use strict';

  var Landsat2016Layer = ImageLayerClass.extend({

    options: {
      urlTemplate: 'https://storage.googleapis.com/landsat-cache/2016/{z}/{x}/{y}.png',
      dataMaxZoom: 12
    }

  });

  return Landsat2016Layer;

});
