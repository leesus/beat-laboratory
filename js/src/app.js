require(['jquery', 'knockout', 'viewmodels/beatlab'], function($, ko, BeatLab){
	$(function(){
    ko.applyBindings(new BeatLab);
  });
});