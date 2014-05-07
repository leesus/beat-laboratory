define(['baseviewmodel', 'webaudio/context', 'webaudio/bufferloader'], function(BaseViewModel, context, BufferLoader){

  var TrackViewModel = BaseViewModel.extend({
    defaults: {
      volume: 0.5,
      mute: false,
      solo: false
    }
  });

  _.extend(TrackViewModel.prototype, {
    init: function() {
      if (typeof this.url !== 'function' || this.url() === '') {
        return;
      }
      
      var url = [],
          loadSound = function onload(buffers){
            this.audio = context.createBufferSource();
            this._buffer = buffers[0];
            this.audio.buffer = buffers[0];
          };

      url.push(this.url());

      this.bufferLoader = new BufferLoader(url, loadSound.bind(this));
      this.bufferLoader.load();
    },
    reloadAudio: function(buffer){
      this.audio = context.createBufferSource();
      this.audio.buffer = buffer || this._buffer;
    }
  });

  return TrackViewModel;

});