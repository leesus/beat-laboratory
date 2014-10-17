define(['knockout', 'webaudio/context', 'baseviewmodel', 'viewmodels/mixer', 'viewmodels/track', 'models/track'], function(ko, context, BaseViewModel, mixer, TrackViewModel, Track){
  var BeatLab = BaseViewModel.extend({
    defaults: {
      playing: false,
      currentStep: 0,
      totalSteps: 16,
      tracks: [],
      steps: [],
      volume: 0.5,
      // Controls
      bpm: 100,
      tempo: function() {
        return 60 * 1000 / this.bpm() * 4;
      }
    },

    init: function init(){
      var steps = this.steps,
          i = 0,
          l = this.totalSteps();

      this.isActiveStep = function(step, instrument) {
        return this.steps()[step].indexOf(instrument) > -1;
      };

      this.isCurrentStep = function(step) {
        //console.log(ko.utils.unwrapObservable(step), this.currentStep())
        var currentStep = this.currentStep() - 1 === -1 ? this.totalSteps() - 1 : this.currentStep() - 1;
        return ko.utils.unwrapObservable(step) === currentStep && this.playing();
      };

      this.loop = this.loop();

      this.tracks.push(new TrackViewModel( new Track({ instrument: 'Kick', url: 'js/test/files/bass.wav' }) ));
      this.tracks.push(new TrackViewModel( new Track({ instrument: 'Snare', url: 'js/test/files/snare.wav' }) ));
      this.tracks.push(new TrackViewModel( new Track({ instrument: 'Hat (closed)', url: 'js/test/files/hat.wav' }) ));

      for (; i < l; i++){
        steps.push(ko.observableArray());
      }

      this.setSample(this.tracks()[0], [1,9,11]);
      this.setSample(this.tracks()[1], [5,13]);
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
      this.currentStep(0);

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

            if (position < _this.totalSteps() - 1) {
              _this.currentStep(position + 1);
            } else {
              _this.currentStep(0);
            }
            _loop = setTimeout(play, _this.tempo() / _this.totalSteps());
          };

      return {
        start: function start() {
          play();
        },
        stop: function stop() {
          clearTimeout(_loop);
        }
      };
    },
    playStep: function playStep() {
      var tracks = this.steps()[this.currentStep()](),
          i = 0,
          l = tracks.length;

      for (; i < l; i++) {
        var track = tracks[i];

        if (track.audio.playbackState !== 0) {
          track.reloadAudio();
        }
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
        this.steps()[step].push(instrument);
      }
    },
    unsetSample: function unsetSample(instrument, steps) {
      var i = 0, l = steps.length;

      for (; i < l; i++) {
        var step = steps[i];
        var idx = this.steps()[step].indexOf(instrument);
        this.steps()[step].splice(idx, 1);
      }
    },
    toggleSample: function toggleSample(instrument, steps) {
      var i = 0, l = steps.length;
      for (; i < l; i++) {
        var step = steps[i];
        if (this.steps()[step].indexOf(instrument) >= 0) {
          this.unsetSample(instrument, [step]);
        } else {
          this.setSample(instrument, [step]);
        }
      }
    },
    setVolume: function() {
      mixer.setVolume.apply(mixer, arguments);
      return true;
    }
  });

  return BeatLab;

});