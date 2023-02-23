var links = {
  video:"ban_1uideosbeta1o1o1o1o46z6937z1111111111111111111111111yyp79bw8",
  tuit:"ban_1tuit11111111111111111111111111111111111111111111111sz1es33f",
  profile:"ban_1profi1etestbeta838174916311111111111111111111111111u98rzn6m",
  livechat:"ban_1chat11111111111111111111111111111111111111111111111sj7bxfq1"
}
function makeVideo(title, desc, url, thumbnail, nsfw) {
  var ins = []
  ins = ins.concat("F6" + encodeMsg(url) + tryM("F1" + encodeMsg(title)) + tryM("F2" + encodeMsg(desc)) + tryM("F3" + encodeMsg(thumbnail)))
  if (nsfw) {
    ins.push("FB")
  }
  ins = ins.join("").match(/.{1,64}/g) ?? [];
  ins[ins.length-1] += "0".repeat(64-ins[ins.length-1].length)
  for (i in ins) {
    ins[i] = banano.getBananoAccount(ins[i])
  }
  return ins
}
function tryM(e) {
  if (e.length == 2) {
    return ""
  } else {
    return e
  }
}
function makeComment(comment) {
  var ins = []
  ins = ins.concat("F7" + encodeMsg(comment))
  ins = ins.join("").match(/.{1,64}/g) ?? [];
  ins[ins.length-1] += "0".repeat(64-ins[ins.length-1].length)
  for (i in ins) {
    ins[i] = banano.getBananoAccount(ins[i])
  }
  return ins
}
function makeTuit(title, description) {
  var ins = []
  ins = ins.concat("F9" + encodeMsg(title) + "F1" + encodeMsg(title))
  ins = ins.join("").match(/.{1,64}/g) ?? [];
  ins[ins.length-1] += "0".repeat(64-ins[ins.length-1].length)
  for (i in ins) {
    ins[i] = banano.getBananoAccount(ins[i])
  }
  return ins
}
function makeProfile(nick, bio) {
  var ins = []
  ins = ins.concat("F8" + tryM("F1" + encodeMsg(nick)) + tryM("F2" + encodeMsg(bio)))
  ins = ins.join("").match(/.{1,64}/g) ?? [];
  ins[ins.length-1] += "0".repeat(64-ins[ins.length-1].length)
  for (i in ins) {
    ins[i] = banano.getBananoAccount(ins[i])
  }
  return ins
}
async function uploadPost(ins, type) {
  for (i in ins) {
    try {
      await banano.changeBananoRepresentativeForSeed(seed, 0,  ins[i])
    } catch {
      error("Account is unopened, Please deposit some banano first")
      return
    }
  }
  console.log("Uploaded to "+type)
  return withdrawRawBanano(links[type], 1)
}
async function uploadComment(ins, post) {
  for (i in ins) {
    try {
      await banano.changeBananoRepresentativeForSeed(seed, 0,  ins[i])
    } catch {
      error("Account is unopened, Please deposit some banano first")
      return
    }
  }
  post = banano.getBananoAccount(post)
  var upload = await withdrawBanano(post, 0.00000000000000000000000000001)
  console.log(upload)
}
function val(q) {
  return document.body.querySelector(q).value
}
let IPFS
let repopath = Math.random()
async function initIPFS() {
  IPFS = await window.IpfsCore.create()
}
initIPFS()
async function uploadVideo() {
  var thumbnail = sel("#thumbnail-file").files[0]
  var video = sel("#video-file").files[0]
  var title = sel("#video-title").value
  var desc = sel("#video-description").value
  if (thumbnail != undefined) {
    sel("#progress").innerText = "Uploading Thumbnail..."
    var tnCid = await IPFS.add(thumbnail)
  } else {
    var tnCid = {path:null}
  }
  if (video != undefined) {
    sel("#progress").innerText = "Uploading Video..."
    var vidCid = await IPFS.add(video)
  } else {
    var vidCid = {path:null}
  }
  vidCid = vidCid["path"]
  tnCid = tnCid["path"]
  sel("#progress").innerText = "Uploading Post To Banano Blockchain..."
  await uploadPost(makeVideo(title, desc, vidCid, tnCid), "video")
  sel("#progress").innerText = "Video Uploaded!"
}
function changeFile(e) {
  var s = e.parentNode.querySelector("span")
  s.innerText = e.files[0]["name"]
  s.style.color = "var(--accent)"
}