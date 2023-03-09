//Parameters in JSON
//For posts:
//P1 = TITLE
//P2 = DESCRIPTION
//P3 = MEDIA (seperated by ",")
//P4 = TAGS (seperated by ",")
//P5 = CATEGORY
//P6 = NSFW (ooh sexy)
//For profile changes
//P1 = NICKNAME (Must be sent in 1 block, no rep change)
//P2 = BIO
let useEmotes = false
const encodeUTF8 = (s) => {
  return unescape(encodeURIComponent(s));
}
const decodeUTF8 = (s) => {
  return decodeURIComponent(escape(s));
}
const encodeMSG = (tmp) => {
  tmp = encodeUTF8(tmp)
  let str = ""
  for (i=0;i<tmp.length;i++) {
    str += tmp.charCodeAt(i).toString(16).padStart(2, "0")
  }
  str = str.match(/.{64}|.{1,64}/g);
  str[str.length-1] = str[str.length-1].padStart(64, "0")
  return str
}
const decodeMSG = (hex) => {
  let str = '';
  for (i=0;i<hex.length;i+=2) {
    let v=parseInt(hex.substr(i, 2), 16);
    if (v)str+=String.fromCharCode(v);
  }
  try {
    JSON.parse(`["${str}"]`)
  } catch {
    return ""
  }
  return str
}
const msgToJSON = (msg) => {
  msg = msg.replaceAll("\\:", "™%°=").split(":")
  let json = {}
  for (i in msg) {
    if (msg[i]!="") json[`P${parseInt(i)+1}`] = msg[i].replaceAll("™%°=", ":")
  }
  return json
}
const b64toH = (e) => {
  const raw = atob(e);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}
const hToB64 = (e) => {
  return btoa(e.match(/\w{2}/g).map(function(a){return String.fromCharCode(parseInt(a, 16));} ).join(""))
}
const setPage = (e) => {
  document.body.innerHTML = ""
  document.body.innerHTML = e.replaceAll("\\;",";")
}
const getSite = async (acc) => {
  const h = (await accHistory(acc, "-1", true))["history"]
  let res = []
  for (i in h) if (h[i]["subtype"] == "change") res.push(decodeMSG(publicKey(h[i]["representative"])))
  return res.reverse().join("")
}