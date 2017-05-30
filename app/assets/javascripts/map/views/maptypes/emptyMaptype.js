/**
 * Landsat EmptyMapType.
 */
define([], function () {

  'use strict';

  var EmptyMapType = function(year) {
    var config = {
      name: 'Empty',
      alt: '',
      maxZoom: 17,
      isPng: true,
      tileSize: new google.maps.Size(256, 256),
      getTileUrl: function(ll, z) {
        return null;
      },
    };

    return new google.maps.ImageMapType(config);
  };

  return EmptyMapType;
});
