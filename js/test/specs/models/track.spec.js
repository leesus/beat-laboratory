define(['models/track'], function(Track){

  describe('Track model', function(){

    it('should return a new Track instance', function(){
      expect((new Track).constructor.name).toEqual('Track');
    });

    it('should have a url', function(){
      expect((new Track).url).toEqual('');
    });

    it('should have an instrument name', function(){
      expect((new Track).instrument).toEqual('');
    });

    it('should accept an options hash to initialise with', function(){
      var options = { url: '../../files/bass.wav', instrument: 'Bass Drum' };
      var track = new Track(options);

      expect(track.url).toEqual('../../files/bass.wav');
      expect(track.instrument).toEqual('Bass Drum');
    });

  });

});