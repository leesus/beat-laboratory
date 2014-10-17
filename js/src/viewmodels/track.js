define(['baseviewmodel', 'webaudio/context', 'webaudio/bufferloader', 'viewmodels/mixer'], function(BaseViewModel, context, BufferLoader, mixer){

  var TrackViewModel = BaseViewModel.extend({
    defaults: {
      mute: false,
      solo: false
    }
  });

  _.extend(TrackViewModel.prototype, {
    init: function() {
      if (typeof this.url !== 'function' || this.url() === '') {
        return;
      }

      this.nodes = {};

      var url = [],
          loadSound = function onload(buffers){
            this.audio = context.createBufferSource();
            this._buffer = buffers[0];
            this.audio.buffer = buffers[0];
            // Setup defaults and subscribables for nodes
            this.createNodes();
            this.setValues();
          };

      url.push(this.url());

      this.bufferLoader = new BufferLoader(url, loadSound.bind(this));
      this.bufferLoader.load();
    },
    reloadAudio: function(buffer){
      this.audio = context.createBufferSource();
      this.audio.buffer = buffer || this._buffer;

      this.audio.connect(this.nodes.volume);
    },
    createNodes: function() {
      this.nodes.volume = context.createGain();

      this.nodes.volume.connect(mixer.nodes.volume);
    },

    setValues: function() {
      this.setVolume(0.5);
    },
    setVolume: function(volume, evt) {
      this.nodes.volume.gain.value = !evt ? volume : evt.target.value;
      console.log(this.instrument() + ' volume', this.nodes.volume.gain.value);
      return true;
    }
  });

  return TrackViewModel;

});