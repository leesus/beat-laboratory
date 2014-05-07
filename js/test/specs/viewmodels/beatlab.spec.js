define(['viewmodels/beatlab'], function(BeatLab) {
  var viewmodel = new BeatLab();

  describe('BeatLab viewmodel', function() {

    beforeEach(function(){
      viewmodel = new BeatLab();
    });

    describe('when initialised', function(){
      
      it('should have a playing flag, defaulting to false', function() {
        expect(viewmodel.playing()).toBe.false;
      });

      it('should have current step property starting at 1', function() {
        expect(viewmodel.currentStep()).toEqual(1);
      });

      it('should have a steps multi-dimensional array to track instruments needed for a particular step', function() {
        expect(viewmodel.steps().length).toEqual(16);
        expect(_.isArray(viewmodel.steps()[0])).toBe.true;
      });

      it('should have a volume property defaulting to 0.5', function(){
        expect(viewmodel.volume()).toEqual(0.5);
      });

      it('should have a balance property defaulting to 0.5', function(){
        expect(viewmodel.balance()).toEqual(0.5);
      });

    });

    it('should be able to play, pause and stop', function(){
      expect(viewmodel.playing()).toEqual(false);
      expect(viewmodel.currentStep()).toEqual(1);
      viewmodel.play();
      viewmodel.currentStep(3);
      expect(viewmodel.playing()).toEqual(true);
      viewmodel.pause();
      expect(viewmodel.playing()).toEqual(false);
      expect(viewmodel.currentStep()).toEqual(3);
      viewmodel.play();
      expect(viewmodel.playing()).toEqual(true);
      expect(viewmodel.currentStep()).toEqual(3);
      viewmodel.stop();
      expect(viewmodel.playing()).toEqual(false);
      expect(viewmodel.currentStep()).toEqual(1);
    });

    it('should be able to change volume', function(){
        expect(viewmodel.volume()).toEqual(0.5);
        viewmodel.volume(1);
        expect(viewmodel.volume()).toEqual(1);
        viewmodel.volume(0.5);
        expect(viewmodel.volume()).toEqual(0.5);
    });

    it('should be able to change the balance', function(){
        expect(viewmodel.balance()).toEqual(0.5);
        viewmodel.balance(1);
        expect(viewmodel.balance()).toEqual(1);
        viewmodel.balance(0.5);
        expect(viewmodel.balance()).toEqual(0.5);
    });



  });

});