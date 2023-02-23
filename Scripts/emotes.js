var emotes = {
  "⥓01":"100.webp",
  "⥓02":"adios.webp",
  "⥓03":"angryjoy.webp",
  "⥓04":"aww.webp",
  "⥓05":"bananoheart.webp",
  "⥓06":"bananorain.webp",
  "⥓07":"bananosex.gif",
  "⥓08":"bangry.webp",
  "⥓09":"banhehehe.webp",
  "⥓10":"banhugattack.gif",
  "⥓11":"banhyperwoah.webp",
  "⥓12":"banmotherofgod.webp",
  "⥓13":"banrage.webp",
  "⥓14":"bantrololol.webp",
  "⥓15":"bebe.webp",
  "⥓16":"bebecheer.webp",
  "⥓17":"bebeheart.webp",
  "⥓18":"bebeking.webp",
  "⥓19":"bebenoted.webp",
  "⥓20":"bebesmugblush.webp",
  "⥓21":"exitscam.webp",
  "⥓22":"feelbetterhug.webp",
  "⥓23":"fucking.gif",
  "⥓24":"high.webp",
  "⥓25":"hng.webp",
  "⥓26":"hngheart.webp",
  "⥓27":"panicharmonica.webp",
  "⥓28":"pepban.webp",
  "⥓29":"raugh.webp",
  "⥓30":"sadchris.webp",
  "⥓31":"small.webp",
  "⥓32":"smug.webp",
  "⥓33":"sook.webp",
  "⥓34":"tanoeyes.webp",
  "⥓35":"thinkingguy.webp",
  "⥓36":"tick.webp",
  "⥓37":"tip.webp",
  "⥓38":"wen.webp",
  "⥓39":"ayaya.webp",
  "⥓40":"bonk.gif"
}
var emoteKeys = Object.keys(emotes)
function convertEmote(e) {
  for (i in emoteKeys) {
    e.innerHTML = e.innerHTML.replaceAll(
    `${emoteKeys[i]}`, `<img class='emote' src='../Media/emotes/${emotes[emoteKeys[i]]}'/>`
  )
  }
}
function initEmotes() {
  var emlist = document.body.querySelector("emotelist")
  var emoteListHTML = ""
  for (key in emotes) {
    emoteListHTML += `<a onmousedown='return false' onclick='inputEmote(this)' emote="${emotes[key].split(".")[0]}">${key}</a>`
  }
  try {
    document.body.querySelector("emotelist emotes").innerHTML = emoteListHTML
  } catch {}
  convertEmote(document.body)
}
function inputEmote(em) {
  var e = `:${em.getAttribute("emote")}:`
  var t = em.parentNode.parentNode.getAttribute("target")
  sel("#"+t).value += " "+e
}
function openEmoteList(t) {
  var emlist = document.body.querySelector("emotelist")
  emlist.className = "open"
  emlist.setAttribute("target", t.id)
}
function closeEmoteList() {
  var emlist = document.body.querySelector("emotelist")
  emlist.className = ""
}