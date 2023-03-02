var sh
var shInvert = {}
fetch('../Scripts/characters.json')
.then(
  r => {
    r.json().then(function(d) {
      sh = d
      var keys = Object.keys(d)
      for (i in sh) {
        shInvert[sh[i]] = i
      }
})})
function decodeMsg(txt) {
  var d = txt.match(/.{1,2}/g) ?? [];
  for (i in d) {
    if (isCmd(d[i])[0]) {
      d[i] = isCmd(d[i])[1]
    } else {
      d[i] = shInvert[d[i]]
    }
  }
  return decodeSpecial(d.join(""))
  }
function encodeMsg(txt) {
  console.log(txt)
  if (txt == null || txt == undefined||txt == "") {return ""}
  txt = txt.trim()
  for (key in emoteKeys) {
    txt = txt.replaceAll(`:${emotes[emoteKeys[key]].split(".")[0]}:`, emoteKeys[key])
  }
  var e = txt.split("")
  for (i in e) {
    var backup = e[i]
    e[i] = sh[e[i]]
    if (e[i] == undefined) {
      e[i] = encodeMsg(encodeSpecial(backup))
    }
  }
  return e.join("")
}
function encodeSpecial(str) {
  return [...str].map((char) => char.codePointAt() > 127 ? `⇃${char.codePointAt()}⇃` : char).join('')
}
function decodeSpecial(str) {
  try {
    str=str.split("⇃")
    for (i in str) {
    try {
      str[i] = String.fromCodePoint(str[i])
    } catch {}
    }
    return str.join("")
  } catch {
    return "Unnamed"
  }
}