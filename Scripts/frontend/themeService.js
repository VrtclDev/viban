var themes = {
  "default": [
    "--background:#202132",
    "--background-secondary:#303360",
    "--background-dark:#151523",
    "--text:#DFE1FF",
    "--soft:#4A4D7A",
    "--soft-href:#6367A1",
    "--logoBan:#FBDD11",
    "--video-bg:#0D0D14"
  ],
  "light": [
    "--background:#F9F9FF",
    "--background-secondary:#D1D1EA",
    "--background-dark:#EAEAF5",
    "--text:#22222E",
    "--soft:#6E6E75",
    "--soft-href:#6E6E75",
    "--video-bg:#0D0D14"
  ]
}
const root = document.querySelector(":root")
const setTheme = (theme) => {
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
const initTheme = () => {
  var theme = window.localStorage.getItem("theme")
  if (theme == null) {
    setTheme("default")
  } else {
    setTheme(theme)
  }
}