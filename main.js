// Thanks to https://sebastiandedeyne.com/javascript-framework-diet/
// also thanks to https://www.section.io/engineering-education/how-to-build-a-music-player-with-vanilla-javascript/

function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(type, selector, callback) {
  document.addEventListener(type, event => {
    const target = event.target.closest(selector);

    if (target) {
      callback(event, target);
    }
  });
}

// Reference: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// Add appendAfter() method for appending an element
// after another element
// Reference: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
},false;

// Thanks to https://codepen.io/crouchingtigerhiddenadam/pen/EoJWPq
function Range(parent) {
  let percent = 0;
  this.percent = percent;
  let rangeBar = document.createElement("div");
  rangeBar.style.width = parseInt(percent) + "%";
  this.rangeBar = rangeBar;
  rangeBar.classList.add("range-bar");
  let rangeHandle = document.createElement("div");
  rangeHandle.style.left = parseInt(percent) + "%";
  this.rangeHandle = rangeHandle;
  rangeHandle.classList.add("range-handle");
  let range = document.createElement("div");
  this.range = range;
  range.appendChild(rangeBar);
  range.appendChild(rangeHandle);
  range.classList.add("range");
  parent.appendChild(range);
}

Range.prototype.set_start = function() {
    this.rangeBar.style.width = "0%";
    this.rangeHandle.style.left = "0%";
}

// Range.prototype.focus = function () {
//   if (document.activeElement !== this.range) this.range.focus();
// };

// Range.prototype.keydown = function (event) {
//   if (event.keyCode == 37) this.setPercent(this.percent - 1);
//   else if (event.keyCode == 39) this.setPercent(this.percent + 1);
// };

// Range.prototype.mousedown = function (event) {
//   var clientX = event.clientX;
//   document.addEventListener("mousemove", this.mousemove, true);
//   document.addEventListener("mouseup", this.mouseup, true);
//   this.slide(clientX);
// };

// Range.prototype.mousemove = function (event) {
//   var clientX = event.clientX;
//   this.slide(clientX);
// };

// Range.prototype.mouseup = function (event) {
//   document.removeEventListener("mousemove", this.mousemove, true);
//   document.removeEventListener("mouseup", this.mouseup, true);
// };

// Range.prototype.slide = function (clientX) {
//   var offsetX = clientX - this.rangeBar.getBoundingClientRect().left,
//     percent = offsetX / this.range.clientWidth * 100;
//   this.focus();
//   this.setPercent(percent);
//   set_progress();
// };

// Range.prototype.touchend = function (event) {
//   document.removeEventListener("touchmove", this.touchmove, true);
//   document.removeEventListener("touchend", this.touchend, true);
// };

// Range.prototype.touchmove = function (event) {
//   var clientX = event.touches[0].clientX;
//   this.slide(clientX);
// };

// Range.prototype.touchstart = function (event) {
//   var clientX = event.touches[0].clientX;
//   document.addEventListener("touchmove", this.touchmove, true);
//   document.addEventListener("touchend", this.touchend, true);
//   this.slide(clientX);
// };

// Range.prototype.setPercent = function (percent) {
//   if (percent < 0) percent = 0;
//   else if (percent > 100) percent = 100;
//   this.rangeBar.style.width = parseInt(percent) + "%";
//   this.rangeHandle.style.left = parseInt(percent) + "%";
//   this.percent = percent;
// };

// Main application code begins here

// Graceful degradation: shows default browser media player when javascript is disabled/does not load
const audio = $("#audio");
audio.style.display = "none";

const player = $(".player-container");
const player_title = $("#player-title");
const play_prev_btn = $("#play-prev");
const play_btn = $("#play");
const play_next_btn = $("#play-next");
const loop_btn = $("#loop");
const download_btn = $("#download");
const player_progressbar = $("#player-progressbar");
const autoplay_btn = $("#autoplay_btn");
const poem_english_container = $("#poem-english article");
const poem_commandian_container = $("#poem-commandian article");

function load_song(song) {
  player_title.innerText = `Currently playing: ${song}`;
  audio.src = song;
}

function load_poem(poem_array) {
    for (let line of poem_array[0].split("\n")) {
        let p = document.createElement("p");
        p.innerText = line;
        poem_english_container.append(p)
    }
    for (let line of poem_array[1].split("\n")) {
        let p = document.createElement("p");
        p.innerText = line;
        poem_commandian_container.append(p)
    }
}

function play_song() {
  player.classList.add('play');
  play_btn.querySelector("i.icon").classList.remove("icon-play");
  play_btn.querySelector("i.icon").classList.add("icon-pause");
  audio.play();
}

function pause_song() {
  player.classList.remove('play');
  play_btn.querySelector("i.icon").classList.add("icon-play");
  play_btn.querySelector("i.icon").classList.remove("icon-pause");
  audio.pause();
}

function set_progress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function update_progress(e) {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progressbar.rangeBar.style.width = parseInt(percent) + "%";
    progressbar.rangeHandle.style.left = parseInt(percent) + "%";
}

// Referenced from https://tutorialspoint.com/function-to-choose-elements-randomly-in-javascript
function choose_random(arr, num = 1) {
   const res = [];
   for(let i = 0; i < num; ){
      const random = Math.floor(Math.random() * arr.length);
      if(res.indexOf(arr[random]) !== -1){
         continue;
      };
      res.push(arr[random]);
      i++;
   };
   return res;
};

// Create progress bar
let progressbar = new Range(player_progressbar);

// Load random song
let songs = Object.keys(songs_list);
let current_song = choose_random(songs)[0];
let index = songs.indexOf(current_song)
load_song(songs_list[current_song]);

// Load random poem
let poems = Object.keys(poems_list);
let current_poem = choose_random(poems)[0];
load_poem(poems_list[current_poem])

// Reference: https://egghead.io/lessons/react-cycle-through-an-array-of-values-with-the-modulus-operator
function prev_song() {
    pause_song()
    index--;
    current_song = songs[(index - 1 + songs.length) % songs.length];
    console.log(`Playing previous song ${songs_list[current_song]}`)
    load_song(songs_list[current_song])
    progressbar.set_start();
}

function next_song() {
    pause_song()
    index++;
    current_song = songs[(index + 1) % songs.length];
    console.log(`Playing next song ${songs_list[current_song]}`)
    load_song(songs_list[current_song])
    progressbar.set_start();
}

function handle_play() {
  if (player.classList.contains('play')) {
    pause_song();
  } else {
    play_song();
  }
}

function loop_on() {
    console.log("Loop ON");
    audio.loop = true;
    loop_btn.firstElementChild.classList.remove("icon-loop");
    loop_btn.firstElementChild.classList.add("icon-loop-active");
}

function loop_off() {
    console.log("Loop OFF");
    audio.loop = false;
    loop_btn.firstElementChild.classList.add("icon-loop");
    loop_btn.firstElementChild.classList.remove("icon-loop-active");
}

function handle_loop() {
    // If not loop then turn loop on
    let is_loop_off = loop_btn.firstElementChild.classList.contains("icon-loop");

    if (is_loop_off) {
        loop_on()
    } else {
        loop_off()
    }
}

function handle_autoplay() {
    if (autoplay_btn.checked == true) {
        console.log("Autoplay ON");
        audio.autoplay == true;
    } else {
        console.log("Autoplay OFF");
        audio.autoplay == false
    }
}

function handle_download() {
    let song_name = `${current_song}.mp3`;
    download(audio.src, song_name);
}

function download(path, filename) {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    anchor.download = filename;

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
};

// Get all the toggletip buttons w/ event delegation
$(".player-controls").addEventListener("click", (event) => {
  target = event.target.closest("[data-control]");
  if (target.tagName != "BUTTON") {
  }
  switch (target.id) {
    case "play":
      handle_play();
      break;
    case "loop":
      handle_loop();
      break;
    case "download":
      handle_download();
      break;
    case "play-prev":
      prev_song();
      break;
    case "play-next":
      next_song();
      break;
    case "autoplay":
      handle_autoplay();
      break;
  }
})

audio.addEventListener('timeupdate', update_progress);
player_progressbar.addEventListener('click', set_progress);
