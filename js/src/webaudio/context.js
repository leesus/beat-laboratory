define(function(){
  var AudioContext = webkitAudioContext || AudioContext;

  return new AudioContext;
});