define(['knockout', 'webaudio/context', 'baseviewmodel', 'viewmodels/track', 'models/track'], function(ko, context, BaseViewModel, TrackViewModel, Track){
  var AudioContext = webkitAudioContext || AudioContext;
  var BeatLab = BaseViewModel.extend({
    defaults: {
      playing: false,
      currentStep: 1,
      totalSteps: 16,
      tracks: [],
      steps: [],
      volume: 0.5,
      balance: 0.5,
      // Controls
      bpm: 100,
      tempo: function(){
        return 60 * 1000 / this.bpm() * 4;
      }
    },
    context: context,
    init: function init(){
      var steps = this.steps,
          i = 0,
          l = this.totalSteps();

      for (; i < l; i++){
        steps.push([]);
      }

      console.log(this.steps().length)

      this.loop = this.loop();

      this.tracks.push(new TrackViewModel( new Track({ instrument: 'Kick', url: '/js/test/files/bass.wav' }) ));
      this.tracks.push(new TrackViewModel( new Track({ instrument: 'Snare', url: '/js/test/files/snare.wav' }) ));

      //this.setSample(this.tracks()[0], [1,9,11]);
      //this.setSample(this.tracks()[1], [5,13]);
    }
  });

  _.extend(BeatLab.prototype, {
    play: function play(){
      var playing = this.playing();

      if (!playing) {
        this.playing(true);
        this.loop.start();
      }

      return this;
    },
    pause: function pause(){
      var playing = this.playing();

      if (playing) {
        this.playing(false);
        this.loop.stop();
      }

      return this;
    },
    stop: function stop(){
      var playing = this.playing();
      
      this.playing(false);
      this.currentStep(1);

      if (playing) {
        this.loop.stop();
      }

      return this;
    },
    loop: function loop() {

      var _this = this,
          _loop = null,
          play = function play() {
            var position = _this.currentStep(),
                steps = _this.steps();

            _this.playStep();

            if (position < _this.totalSteps()) {
              _this.currentStep(position + 1);
            } else {
              _this.playStep();
              _this.currentStep(1);
            }
          };

      return {
        start: function start() {
          _loop = setInterval(play, _this.tempo() / _this.totalSteps());
        },
        stop: function stop() {
          clearInterval(_loop);
        }
      };
    },
    playStep: function playStep() {
      var tracks = this.steps()[this.currentStep() - 1],
          i = 0,
          l = tracks.length;


      for (; i < l; i++) {
        var track = tracks[i];

        if (track.audio.playbackState !== 0) {
          track.reloadAudio();
        }
        track.audio.connect(context.destination);
        track.audio.start(0);
      }
    },
    stopStep: function playStep() {
      var tracks = this.steps()[this.currentStep() - 1],
          i = 0,
          l = tracks.length;

      for (; i < l; i++) {
        var track = tracks[i];

        if (track) {        
          track.audio.stop(0);
        }
      }
    },
    setSample: function setSample(instrument, steps) {
      var i = 0, l = steps.length;
      for (; i < l; i++) {
        var step = steps[i];
        this.steps()[step - 1].push(instrument);
      }
    },
    unsetSample: function unsetSample(instrument, steps) {
      var i = 0, l = steps.length;
      for (; i < l; i++) {
        var step = steps[i];
        this.steps.splice(step - 1, 1, []);
      }
    },
    toggleSample: function toggleSample(instrument, steps) {
      var i = 0, l = steps.length;
      for (; i < l; i++) {
        var step = steps[i];
        if (this.steps()[step - 1].indexOf(instrument) >= 0) {
          this.unsetSample(instrument, [step]);
        } else {
          this.setSample(instrument, [step]);
        }
      }
    }
  });

  return BeatLab;

});