define(['webaudio/context'], function(context){
  
  var BufferLoader = function BufferLoader(urlList, fn){
    if (!urlList || !fn) {
      throw new Error('Missing required arguments');
    }

    this.context = context;
    this.urlList = urlList;
    this.onload  = fn;
    this.bufferList = [];
    this.loadCount = 0;
  };

  BufferLoader.prototype.loadBuffer = function loadBuffer(url){
    var request = new XMLHttpRequest(),
        self = this;
    request.open('GET', url);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      self.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }

          self.bufferList.push(buffer);

          if (++self.loadCount === self.urlList.length){
            self.onload(self.bufferList);
          }
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }

    request.send();
  };

  BufferLoader.prototype.load = function load(){
    for (var i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i]);
    }
  };

  return BufferLoader;

});