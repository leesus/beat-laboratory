define(function(){
  
  var Track = function Track(options){
    this.url = options && options.url || '';
    this.instrument = options && options.instrument || '';
  };

  return Track;

});