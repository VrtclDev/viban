//Parameters in JSON
//For posts:
//P1 = TITLE
//P2 = DESCRIPTION
//P3 = MEDIA
//P4 = TAGS
//P5 = CATEGORY
//P6 = NSFW=ENABLED (ooh sexy)
//For profile changes
//P1 = NICKNAME
//P2 = BIO
//P3 = PFP
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
  return str.join("")
}
const decodeMSG = (hex) => {
  let str = '';
  for (i=0;i<hex.length;i+=2) {
    let v=parseInt(hex.substr(i, 2), 16);
    if (v)str+=String.fromCharCode(v);
  }
  return str
}
const parseToJSON = (msg) => {
  msg = msg.replaceAll("\\:", "™%°=").split(":")
  let json = {}
  for (i in msg) if (msg[i]!="") json[`P${parseInt(i)+1}`] = msg[i].replaceAll("™%°=", ":")
  return json
}
const makeInstructions = (list)  => {
  list=list.join(":")
  console.log(list)
    return encodeMSG(list)
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