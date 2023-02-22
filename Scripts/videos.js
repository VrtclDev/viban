var Video
async function setupVideojs() {
if (document.body.className.includes("video")) {
  Video = videojs(sel("video-js"), {
    preload:"auto"
  })
  Video.controlBar.remainingTimeDisplay.displayNegative = false
  await initVid()
}
}
setupVideojs()
function shareVideo() {
  var shareData = {
    title: 'Hello!',
    text: 'Check out this video i found on ViBAN!',
    url: window.location
  }
  navigator.share(shareData)
}
function ipfsLink(e) {
  return `https://ipfs.io/ipfs/${e}`
}
async function setVideo(json) {
  await Video.currentSrc(ipfsLink(json["video"]))
  setText(".videoTitle",json["title"])
  document.querySelector("title").innerText = "ViBAN - "+ decodeSpecial(json["title"])
  setText(".videoDescription", json["description"])
  setText(".videoAuthorAndTime", `• ${json["author"].substring(0, 11)+"..."} - ${timeSince(json["timestamp"])}`)
  setText(".infoPostHash", json["hash"])
  setText(".infoAuthor", json["author"])
  sel("#video-container").classList.remove("hidden")
  sel("#not-found").classList.add("hidden")
  document.body.classList.remove("imaged")
  getComments(json["hash"]).then(c => {
    console.log(c)
    sel(".commentCount").innerText = c.length + " Comment"
    if (c.length > 0) {
      sel(".commentCount").innerText = c.length + " Comments"
    }
    for (i in c) {
      var author = c[i]["author"]
      var timestamp = c[i]["timestamp"]
      var comment = sel("#comment").cloneNode(true)
      comment.className=""
      setText(comment.querySelector("p"), decodeSpecial(c[i]["comment"]))
      console.log(author)
      comment.querySelector("inf").innerText = `• ${author.substring(0, 11)+"..."} - ${timeSince(timestamp)}`
      sel("comments").append(comment)
      comment.querySelector("pfp").style.backgroundImage = `url(https://monkey.banano.cc/api/v1/monkey/${author})`
    }
  })
}
function loadVideoFeed(json, filter) {
  sel("#novids").className = "hidden"
  var vid = sel("#feed_video").cloneNode(true)
  vid.className=""
  sel("videos").append(vid)
  setText(vid.querySelector("t"), json["title"])
  vid.querySelector("inf").innerText = `• ${json["author"].substring(0, 11)+"..."} - ${timeSince(json["timestamp"])}`
  if (json["thumbnail"] != undefined) {
  vid.querySelector("thumbnail").style.backgroundImage = `url(${ipfsLink(json["thumbnail"])})`
  console.log(json["thumbnail"])
  vid.querySelector("thumbnail").style.backgroundSize = "contain"
  }
  vid.setAttribute("hash", json["hash"])
  let player = document.createElement('video')
  player.setAttribute('src', ipfsLink(json["video"]))
  player.addEventListener('durationchange', function() {
    vid.querySelector("time").innerText = toTime(player.duration)
  });
}
function toTime(seconds) {
  seconds = Math.floor(seconds)
  var date = new Date(null);
  date.setSeconds(seconds);
  date = date.toISOString().substr(11, 8).split(":")
  if (seconds<60) {
    return `0:${date[2]}`
  }
  if (seconds>60 && seconds<3600) {
    return `${parseInt(date[1])}:${date[2]}`
  }
  if (seconds>=3600) {
    date[0]=parseInt(date[0])
    return date.join(":")
  }
}
function timeSince(ts) {
  var timeStamp = new Date(parseInt(ts)*1000)
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's ago';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm ago';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h ago';
  }
  if (secondsPast > 86400) {
    day = timeStamp.getDate();
    month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return  year + " " + month + " " + day;
  }
}
function initVid() {
  let params = new URL(window.location).searchParams;
  params = params.get("video")
  if (params != null) {
  getPostFromHash(params).then(v => setVideo(v))
  }
}
function comment() {
  var comment = sel("#comment_input")
  var posthash = sel(".infoPostHash").innerText
  if (comment.value == "" || comment.value.includes("⇜")) {
    return
  } else {
    uploadComment(makeComment(comment.value),posthash)
    comment.value=""
  }
}
var videoIndex = 0
async function loadVideos() {
  var p = await getPosts(links["video"])
  for (ee in p) {
    if (ee == 10) {
      return
    }
    var post = await getPostFromHash(p[ee])
    if (post["type"] == "video") {
      loadVideoFeed(post)
    }
  }
}
function openVideo(t) {
  var hash = t.parentNode.getAttribute("hash")
  window.location.href = `../video.html?video=${hash}`
}
if (document.body.className.includes("feed")) {
  loadVideos()
}
function tipVideo(isDone, b) {
  if (!isDone) {
    openMenu("#tipVideo")
  }
}
function setText(e, t) {
  if (typeof e == "string") {
    sel(e).innerText = decodeSpecial(t)
    convertEmote(sel(e))
  } else {
    e.innerText = decodeSpecial(t)
    convertEmote(e)
  }
}