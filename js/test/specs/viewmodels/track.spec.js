define(['models/track', 'viewmodels/track'], function(Track, TrackViewModel) {

  describe('Track viewmodel', function(){

    beforeEach(function(){
      this.model = new TrackViewModel();
    });

    afterEach(function(){
      this.model = null;
    });

    it('should setup default properties as observables', function(){
      expect(this.model.volume).toBeDefined();
      expect(this.model.mute).toBeDefined();
      expect(this.model.solo).toBeDefined();

      expect(this.model.volume()).toEqual(0.5);
      expect(this.model.mute()).toEqual(false);
      expect(this.model.solo()).toEqual(false);
    });

    it('should take a model with an instrument and filename', function(){
      var model = new Track({
        url: '/js/test/files/bass.wav',
        instrument: 'Bass Drum'
      });
      this.model = new TrackViewModel(model);

      expect(this.model.url).toBeDefined();
      expect(this.model.instrument).toBeDefined();
      expect(this.model.url()).toEqual('/js/test/files/bass.wav');
      expect(this.model.instrument()).toEqual('Bass Drum');
    });

    describe('when model loaded', function(){

      it('should load the audio if passed a valid model', function(){
        spyOn(TrackViewModel.prototype, 'init').andCallThrough();

        runs(function(){
          this.model = new TrackViewModel(
            new Track({
              url: '/js/test/files/bass.wav',
              instrument: 'Bass Drum'
            })
          );
        });

        waits(500);

        runs(function(){
          expect(this.model.url).toBeDefined();
          expect(TrackViewModel.prototype.init).toHaveBeenCalled();
        });
      });

    });

  });

});