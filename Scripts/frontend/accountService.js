const seed = window.localStorage.getItem("seed")
const login = () => {
  if (seed.length != 64) {
    return
  }
  const m = document.body.querySelector("navmenu")
  m.querySelectorAll("a[loggedin='y']").forEach(e => {
    e.setAttribute("hide", "")
  })
  m.querySelectorAll("a[loggedout='y']").forEach(e => {
    e.setAttribute("hide", "y")
  })
}
const newAccPrompt = async () => {
  const newSeed = genSeed()
  if (await confirmationPrompt("Welcome!", `Before you start, please store the seed below somewhere safe:\n\n${newSeed}`)) {
    window.localStorage.setItem("seed",newSeed);window.location.href="/home.html"
  }
}
const logout = async () => {
  if (await confirmationPrompt("Logout?", "Are you sure you want to logout? all funds will be lost unless you have backed up your seed")) {
    window.localStorage.setItem("seed","");window.location.href="/"
  }
}