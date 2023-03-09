const seed = window.localStorage.getItem("seed") || ""
var info, bal
const login = async  () => {
  if (seed.length != 64) {
    return
  }
  ban.setSeed(seed)
  info = ban.userInfo()
  root.style.setProperty("--adr", `"${info[2]}"`)
  const m = document.body.querySelector("navmenu")
  m.querySelectorAll("a[loggedin='y']").forEach(e => {
    e.setAttribute("hide", "")
  })
  m.querySelectorAll("a[loggedout='y']").forEach(e => {
    e.setAttribute("hide", "y")
  })
  bal = parseFloat(ban.fromRaw(await ban.balance(info[2]))).toFixed(2)
  root.style.setProperty("--bal", `"${bal}"`)
}
const newAccPrompt = async () => {
  const newSeed = ban.genSeed()
  if (await confirmationPrompt("Welcome!", `Before you start, please store the seed below somewhere safe:\n\n${newSeed}`)) {
    window.localStorage.setItem("seed",newSeed);window.location.href="/home.html"
  }
}
const logout = async () => {
  if (await confirmationPrompt("Logout?", "Are you sure you want to logout? all funds will be lost unless you have backed up your seed")) {
    window.localStorage.setItem("seed","");window.location.href="/"
  }
}
const formatAdr = (a) => {
  a = [a.slice(0,11), a.slice(11,58), a.slice(58,64)]
  return `<span>${a[0]}</span>${a[1]}<span>${a[2]}</span>`
}
const deposit = () => {
  confirmationPrompt("Deposit", `<gap t="2"></gap><adr>${formatAdr(info[2])}</adr>`)
}
const maxSend = (e) => {
  e = e.parentNode.querySelector("input[type='number']")
  e.value = e.placeholder
}
const withdraw = async () => {
  const pr = await confirmationPrompt("Withdraw", `<br><field><input type='text' placeholder='To Account..'/><input placeholder='${bal}' type='number'/><p onclick='maxSend(this)'>MAX</p></field>`, true)
  var i = []
  if (pr) {
    pr.forEach(e=>i.push(e.value))
    return ban.withdraw(i[0], i[1])
  }
}