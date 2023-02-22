function openMenu(m) {
  document.body.querySelectorAll("menu").forEach(function(menu){
    menu.classList.remove("open")
  })
  sel(m).classList.toggle("open")
  sel("shadow").className = "on"
}
function closeMenu(b) {
  b.parentNode.classList.remove("open")
  sel("shadow").className = ""
  const inp = b.parentNode.querySelectorAll("input") 
  inp.forEach(function(input) {
    setTimeout(function() {input.value=""}, 600)
  })
}
function error(msg) {
  openMenu("#errorMenu")
  sel("#errorMenu").querySelector("p").innerText = msg
}
function panel() {
  sel("sidepanel").classList.toggle("open")
}
function dropdown(a) {
  var drop = a.parentNode.querySelector(`dropdown.${a.className}`)
  a.querySelector("caret").classList.toggle("down")
  drop.classList.toggle("down")
}
function depositMenu() {
  openMenu("#depositMenu")
  sel("#depositMenu").querySelector("seed").innerText = adr
}
function withdrawMenu(b, confirm) {
  if (!confirm) {
    openMenu("#withdrawMenu")
    var num = sel("#withdrawMenu").querySelector("flex input.num")
    num.setAttribute("placeholder",bal)
  } else {
    var adr = b.parentNode.querySelector("flex input.text").value
    var num = b.parentNode.querySelector("flex input.num").value
    if (!adr.match('^(ban)_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$')) {
      error("Invalid banano address")
      return
    }
    else {
    withdrawBanano(adr, num)
    }
  }
}
function maxSend(b) {
  var inp = b.parentNode.querySelector("input.num")
  inp.value = inp.getAttribute("placeholder")
}
function inputLimit(inp) {
  if (parseFloat(inp.value) > parseFloat(inp.getAttribute("placeholder"))) {
    inp.value = inp.getAttribute("placeholder")
  }
}
function option(e) {
  var drop = `#${e.getAttribute("drop")}-drop`
  
  sel(drop).classList.toggle("dropped")
}
function selOpt(e) {
  var opt = e.innerText
  var d = e.parentNode
  closeDrop(d)
  sel(`sel[drop=${d.id.replaceAll("-drop","")}]`).querySelector("inf").innerText = opt
  if (d.id == "theme-drop") {
    setTheme(opt.toLowerCase())
  }
}
function closeDrop(e) {
  e.classList.remove("dropped")
}
var themeNames = {
  "default":"Default",
  "banano":"Banano",
  "banhub":"BanHub",
  "hell":"Hell"
}
window.onload = e => {
if (document.body.className == "settings") {
  document.body.querySelectorAll("sel").forEach(s => {
    var attr = s.getAttribute("drop")
    var inf = s.querySelector("inf")
    if (attr == "theme") {
      inf.innerText = themeNames[window.localStorage.getItem("theme")]
    }
  })
}
}