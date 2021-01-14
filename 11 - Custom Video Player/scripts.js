/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = document.querySelector('.full-screen');

let itIsFullScreen = false;

/** Build out functions */
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function playTransition(e) {
    if(e.keyCode === 32) {
        togglePlay();
    } else if(e.keyCode === 39) {
        console.log("Skipping 25 seconds...");
        video.currentTime += parseFloat(25);
    } else if(e.keyCode === 37) {
        console.log("Going back 10 seconds...");
        video.currentTime += parseFloat(-10);
    }
}

function skip() {
    let val = this.dataset.skip;
    if(val==25) {
        console.log("Skipping 25 seconds...");
    } else {
        console.log("Going back 10 seconds...");
    }
    video.currentTime += parseFloat(val);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

function handleFullScreen() {
    if(!itIsFullScreen) {
        player.style.maxWidth = "none";
        player.style.width = "100%";
        player.style.height = "100%";
        itIsFullScreen = true;
    } else {
        player.style.maxWidth = "750px";
        player.style.width = "100%";
        player.style.height = "100%";
        itIsFullScreen = false;
    }
}

/** Hook up the event listners */
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreenButton.addEventListener('click', handleFullScreen);

// spacebar pause-play effect;
window.addEventListener("keydown", playTransition);
