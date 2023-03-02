var progress, progressFill, video, textCurrent, playButton, videoContainer
const initVideoService = () => {
  progressFill = document.body.querySelector("videocontainer prgrs.full")
  progress = document.body.querySelector("videocontainer prgrs.r")
  video = document.body.querySelector("videocontainer video")
  textCurrent = document.body.querySelector("videocontainer time")
  playButton = document.body.querySelector("videocontainer i.big-play")
  videoContainer = document.body.querySelector("videocontainer")
  progress.addEventListener("click", setProgress)
  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('canplay', updateProgress);
  video.addEventListener("ended", () => {
    playButton.className = "big-play icon-play"
  })
}
const togglePlay = (e) => {
  const v = e.parentNode.querySelector("video")
  if (v.paused) {
    v.play()
    e.className = "big-play icon-pause"
  } else {
    v.pause()
    e.className = "big-play icon-play"
  }
  startControlTimeout()
}
var controlTimeout
const startControlTimeout = () => {
  clearTimeout(controlTimeout)
  controlTimeout = setTimeout(() => {
    videoContainer.className = ""
  }, 3000)
}
const toggleControls = (e) => {
  videoContainer.classList.toggle("a")
  startControlTimeout()
}
const fullscreen = (element) => {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
const exitFullscreen = () => {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
var isFS = false;
const toggleFs = () => {
	isFS? exitFullscreen() : fullscreen(document.body.querySelector("videocontainer"))
	isFS = !isFS;
}
const neatTime = (time) => {
  if(time < 3600) {
  var minutes = Math.floor((time % 3600)/60);
  var seconds = Math.floor(time % 60);
	seconds = seconds>9?seconds:`0${seconds}`;
	return `${minutes}:${seconds}`;
  } else {
    var hours = Math.floor((time % 86400)/3600)
    var minutes = Math.floor((time % 3600)/60);
    var seconds = Math.floor(time % 60);
	  seconds = seconds>9?seconds:`0${seconds}`;
	  minutes = minutes>9?minutes:`0${minutes}`;
 	  return `${hours}:${minutes}:${seconds}`;
  }
}
const updateProgress = (e) => {
	progressFill.style.width = `${video.currentTime/video.duration*100}%`;
	textCurrent.innerHTML = `${neatTime(video.currentTime)} / ${neatTime(video.duration)}`;
}
const setProgress = (e) => {
	const newTime = e.offsetX/progress.offsetWidth;
	progressFill.style.width = `${newTime*100}%`;
	video.currentTime = newTime*video.duration;
	textCurrent.innerHTML = `${neatTime(video.currentTime)} / ${neatTime(video.duration)}`;
	startControlTimeout()
}
const addVidToFeed = (j) => {
  
}