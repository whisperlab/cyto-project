define([
  '/src/kitt/Coords.js',
  '/src/kitt/DrawEngine3.js',
  '/src/kitt/Utils.js'
  ], 
  function(coords, drawEngine, utils) {

  return kitt = {
    
    name: 'kitt',
    drawEngine: drawEngine,

    start: function(canvas) {
      this.drawEngine.start(canvas);
    }
  };
});