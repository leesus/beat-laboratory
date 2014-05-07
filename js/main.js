window.addEventListener('load', function(){

  var audio = new webkitAudioContext(),
      steps = document.querySelectorAll('.step'),
      position = 0,
      loop = null,
      metronomeInput = document.getElementById('metronome'),
      metronome = false;
      useMetronome = function() {
        return metronome;
      }
      bpmInput = document.getElementById('bpm'),
      bpm = bpmInput.value,
      tempo = function(){
        return 60000 / bpm * 4;
      },
      playBtn = document.querySelector('.play-btn'),
      stopBtn = document.querySelector('.stop-btn'),      
      playing = false,
      play = function play() {
        var previous = position === 0 ? steps[steps.length - 1] : steps[position-1],
            current = position === steps.length ? steps[position-1] : steps[position];

        previous.classList.remove('active');
        current.classList.add('active');

        if (position < steps.length - 1) {
          position += 1;
        } else {
          position = 0;
        }

        if (useMetronome()) {
          playMetronome();
        }

        loop = setTimeout(play, tempo() / steps.length);
      },
      playMetronome = function playMetronome(){
        var tick = 1600,
            tock = 800,
            noteLength = 4,
            osc = audio.createOscillator(),
            gain = audio.createGain();

        if ((position - 1) % 4 === 0) {
          osc.frequency.value = tick;
        } else {
          osc.frequency.value = tock;
        }
        //osc.type = 'square';
        gain.gain.value = 0.2;
        gain.connect(audio.destination);
        osc.connect(gain);
        osc.start(0);

        setTimeout(function(){
          osc.stop(0);
          osc.disconnect(gain);
          gain.disconnect(audio.destination);
        }, noteLength);
      };

    playBtn.addEventListener('click', function(){
      if (!playing) {
        this.innerHTML = 'Pause';
        playing = true;
        play();
      } else {
        this.innerHTML = 'Play';
        playing = false;
        clearTimeout(loop);
      }
    });

    stopBtn.addEventListener('click', function(){
      playing = false;
      clearTimeout(loop);
      position = 0;
      for(var i = 0; i < steps.length; i++){
        steps[i].classList.remove('active');
      }
      playBtn.innerHTML = 'Play';
    });

    bpmInput.addEventListener('change', function(){
      bpm = this.value;
      if (playing) {
        clearTimeout(loop);
        loop = setTimeout(play, tempo());
      }
    });

    metronomeInput.addEventListener('change', function(){
      metronome = this.checked;
      if (playing) {
        clearTimeout(loop)
        loop = setTimeout(play, tempo());
      }
    });

});