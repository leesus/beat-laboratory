require(['jquery', 'knockout', 'viewmodels/beatlab'], function($, ko, BeatLab){
	$(function(){
    beatlab = new BeatLab;
    ko.applyBindings(beatlab);
  });
});