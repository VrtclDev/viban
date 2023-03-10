let posts = JSON.parse(window.localStorage.getItem("viban-post-data")) || {latest_checked:null}
const getPostFromHash = async (hash, author) =>  {
  if (Object.keys(posts).includes(hash)) return posts[hash]
  if (author == null) author = await ban.blockAcc(hash)
  const h = (await ban.history(null, "1", true, hash)).history[0]
  if (h.subtype == "receive") return {}
  const rep = h.representative
  let res = [decodeMSG(ban.adrPub(rep))]
  let previous = h.previous
  let finished = false
  while (!finished) {
    finished = true
    const history = (await ban.history(null, "1", true, previous)).history[0]
    previous = history.previous
    const st = history.subtype
    if (st == "send" || history.previous == "0".repeat(64)) {
      res = msgToJSON(res.reverse().join(""))
      res.author = author
      res.timestamp = h.local_timestamp
      res.hash = hash
      return res
    } else {
      res.push(decodeMSG(ban.adrPub(history.representative)))
      finished = false
    }
  }
  return
}
const getUserPosts = (user) => {
  
}
const updatePostData = async (type) => {
  let offset = "1"
  if (posts.latest_checked == null) offset=null
  const h = (await ban.history(types[type], "-1", true, posts.latest_checked, true, offset)).history
  if (h == "") return false
  for (i in h) {
    if (Object.keys(posts).includes(h[i].link)) {} else {
    const post = await getPostFromHash(h[i].link, h[i].account)
    posts[post.hash] = post
    console.log(post)
    posts.latest_checked = h[i].hash
    }
  }
  posts.latest_checked = h[h.length-1].hash
  window.localStorage.setItem("viban-post-data", JSON.stringify(posts))
  return true
}
const loadFeed = async (type) => {
  console.log(pending, history)
}
const log = async (e) => {
  console.log(await e)
}