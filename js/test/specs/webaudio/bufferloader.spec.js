define(['webaudio/bufferloader'], function(BufferLoader) {

  describe('BufferLoader', function(){

    var AudioContext = webkitAudioContext || AudioContext,
        bufferLoader,
        bass = '/js/test/files/bass.wav',
        snare = '/js/test/files/snare.wav';

    beforeEach(function(){
      bufferLoader = new BufferLoader([bass, snare], function(bufferList){ console.log(bufferList) });
    });

    afterEach(function(){
      bufferLoader = null;
    });

    describe('when initialised', function(){
      it('should return a new BufferLoader instance', function(){
        expect(bufferLoader.constructor.name).toEqual('BufferLoader');
        expect(typeof bufferLoader).toEqual('object');
      });

      it('should throw an error if required arguments are missing', function(){
        expect(function(){ new BufferLoader() }).toThrow('Missing required arguments');
      });

      it('should have instance properties', function(){
        expect(bufferLoader.context).toBeDefined();
        expect(bufferLoader.urlList).toBeDefined();
        expect(bufferLoader.onload).toBeDefined();
        expect(bufferLoader.bufferList).toBeDefined();
        expect(bufferLoader.loadCount).toBeDefined();
      });

      it('should have loadBuffer and load methods', function(){
        expect(bufferLoader.loadBuffer).toBeDefined();
        expect(bufferLoader.load).toBeDefined();
        expect(typeof bufferLoader.loadBuffer).toEqual('function');
        expect(typeof bufferLoader.load).toEqual('function');
      });
    });

    describe('#loadBuffer()', function(){

      it('should request a file, decode the data and update the bufferList and loadCount', function(){
        spyOn(XMLHttpRequest.prototype, 'open').andCallThrough();
        spyOn(XMLHttpRequest.prototype, 'send').andCallThrough();
        spyOn(AudioContext.prototype, 'decodeAudioData').andCallThrough();

        expect(bufferLoader.bufferList.length).toEqual(0);
        expect(bufferLoader.loadCount).toEqual(0);

        runs(function(){
          bufferLoader.loadBuffer(bass);
        });

        waits(500);

        runs(function(){
          expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith('GET', bass);
          expect(AudioContext.prototype.decodeAudioData).toHaveBeenCalled();
          expect(bufferLoader.bufferList.length).toEqual(1);
          expect(bufferLoader.loadCount).toEqual(1);
        });
      });

    });
    
    describe('#load()', function(){

      it('should process the urlList and call bufferLoader for each url', function(){
        spyOn(BufferLoader.prototype, 'loadBuffer').andCallThrough();

        runs(function(){
          bufferLoader.load();
        });

        waits(500);

        runs(function(){
          expect(BufferLoader.prototype.loadBuffer.callCount).toBe(2);
        });
      });

    });

  });

});