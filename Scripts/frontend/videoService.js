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
function timeSince(ts) {
  var timeStamp = new Date(parseInt(ts) * 1000)
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast >= 31540000) {
    if (parseInt(secondsPast / 31540000) == 1) return parseInt(secondsPast / 31540000) + ' Year ago';
    return parseInt(secondsPast / 31540000) + ' Years ago';
  }
  if (secondsPast >= 86400) {
    if (parseInt(secondsPast / 86400) == 1) return parseInt(secondsPast / 86400) + ' Day ago';
    return parseInt(secondsPast / 86400) + ' Days ago';
  }
  if (secondsPast <= 86400) {
    if (parseInt(secondsPast / 3600) == 1) return parseInt(secondsPast / 3600) + ' Hour ago';
    return parseInt(secondsPast / 3600) + ' Hours ago';
  }
  if (secondsPast <= 3600) {
    if (parseInt(secondsPast / 60) == 1) return parseInt(secondsPast / 60) + ' Minute ago';
    return parseInt(secondsPast / 60) + ' Minutes ago';
  }
  if (secondsPast <= 60) {
    if (parseInt(secondsPast == 1)) return parseInt(secondsPast) + ' Second ago';
    return parseInt(secondsPast) + ' Seconds ago';
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
const addVideo = (j) => {
  if (typeof j == "string") return
  const el = document.body.querySelector("#feed-video").cloneNode(true)
  el.querySelector("p").innerText = j.P1
  el.querySelector("inf").innerText = `• ${(j.author).slice(0,12)}... - ${timeSince(j.timestamp)}`
  el.querySelector("pfp").style.background = `url(https://monkey.banano.cc/api/v1/monkey/${j.author})`
  el.setAttribute("hide", "")
  document.body.querySelector("videos").appendChild(el)
}
const loadVideos = () => {
  for (i in posts) addVideo(posts[i])
}
const search = () => {
  let x = 0
  let search = []
  for (i in posts) {
  if (typeof posts[i] != "string") {
    x++
    posts[i].id = x
    search.push(posts[i])
  }
  }
  let miniSearch = new MiniSearch({
    fields: ["P1", "P2"],
    storeFields: ["title", "description"]
  })
  miniSearch.addAll(search)
  document.body.querySelector("videos").innerHTML = ""
  let results = miniSearch.search(document.body.querySelector("#search").value, { fuzzy: 0.2, prefix:true})
  for (i in results) {
    const c = search.filter(function(item) {
    return item.id == results[i].id;
    })
    addVideo(c[0])
  }
  document.body.querySelector("#no-videos").setAttribute("hide", "y")
  if (results.length == 0) document.body.querySelector("#no-videos").setAttribute("hide", "")
}