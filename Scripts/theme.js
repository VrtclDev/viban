var root = document.querySelector(":root")
var themes = {
  "default": [
    "--background:#0E1420",
    "--background-2:#202838",
    "--light-text:#95AAC6",
    "--text:#DEECFF",
    "--timebg:#121212",
    "--accent:#DEECFF",
    "--logoBan:#FBDD11",
    "--monobg:#000F10",
    "--button:#DEECFF"
  ],
  "banano": [
    "--background:#2A2A2E",
    "--background-2:#212124",
    "--light-text:#A1A1A3",
    "--text:#DEDEDF",
    "--accent:#FBDD11",
    "--button:#FBDD11",
    "--timebg:#121212",
    "--logoBan:#FBDD11"
  ],
  "hell": [
    "--background:#0D0000",
    "--background-2:#3A0500",
    "--light-text:#FFC2BD",
    "--text:#FFEFEE",
    "--accent:#FFEFEE",
    "--button:#FFC2BD",
    "--timebg:#121212",
    "--logoBan:#FBDD11"
  ],
  "banhub": [
    "--background:#1B1B1B",
    "--background-2:#292929",
    "--light-text:#808080",
    "--text:white",
    "--accent:#FFA31A",
    "--button:#FFA31A",
    "--timebg:#121212",
    "--logoBan:#FFA31A"
  ],
}
function setTheme(theme) {
  window.localStorage.setItem("theme", theme)
  let colors = themes[theme]
  if (colors == undefined) {
    setTheme("default")
    return
  }
  for (i in colors) {
    var c = colors[i].split(":")
    root.style.setProperty(c[0], c[1])
  }
}
function initTheme() {
  var theme = window.localStorage.getItem("theme")
  if (theme == null) {
    setTheme("default")
  } else {
    setTheme(theme)
  }
}
initTheme()