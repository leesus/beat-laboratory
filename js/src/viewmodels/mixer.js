define(['baseviewmodel', 'webaudio/context'], function(BaseViewModel, context) {
  
  var Mixer = BaseViewModel.extend({
    init: function() {
      this.nodes = {};

      this.createNodes();
      this.setValues();
    }
  });

  _.extend(Mixer.prototype, {
    createNodes: function() {
      this.nodes.volume = context.createGain();
      this.nodes.volume.connect(context.destination);
    },
    setValues: function() {
      this.setVolume(0.5);
    },
    setVolume: function(volume, evt) {
      this.nodes.volume.gain.value = !evt ? volume : evt.target.value;
      console.log('Mixer volume', this.nodes.volume.gain.value);
      return true;
    }
  });

  return new Mixer;

});