var seed = window.localStorage.getItem("seed")
var root = document.querySelector(":root")
var adr
var bal = 0.00
const updateInfo = (d=null) => {
  if (seed == null) {
    return
  }
  adr = getSeedAdr(seed)
  root.style.setProperty("--pfp", `url(https://monkey.banano.cc/api/v1/monkey/${adr})`)
   if (d != null && d["pendingBlocks"] != "") {
      updatePanel(true)
    }
}
const login = () => {
  if (seed == null || seed.length != 64) {
    document.body.querySelectorAll("a.loggedin").forEach(a => {
      a.className = "hidden"
    })
    sel("taskbar pfp").className = "hidden"
    return
  }
  sel("acc.notloggedin").className = "hidden"
  sel("acc.loggedin").className = "loggedin"
  adr = getSeedAdr(seed)
  try {
    updatePanel(true)
  } catch {}
  updateInfo()
  setInterval(function() {
  receiveBananoDeposits().then(d => {
    updateInfo(d)
  })
}, 10000)
}
var importedSeed
function importAccount(b, confirm) {
  if (confirm) {
    const input = b.parentNode.querySelector("input").value
    if (!input.match("^[0123456789abcdefABCDEF]{64}$")) {
      error("Invalid Seed")
      return
    }
    openMenu("#confirmImport")
    importedSeed = input
    const acc = getSeedAdr(input)
    sel("#confirmImport").querySelector("img").setAttribute("src", `https://monkey.banano.cc/api/v1/monkey/${acc}`)
    return
  }
  window.localStorage.setItem("seed", importedSeed)
  window.location.href = "../feed.html"
}
var createdSeed
function accountMenu() {
  openMenu('#createAcc')
  createdSeed = genSeed()
  sel("#createAcc").querySelector("seed").innerText = createdSeed
}
function createAccount() {
  window.localStorage.setItem("seed", createdSeed)
  window.location.href = "../feed.html"
}

function updatePanel(updateBalance) {
  try {
  sel("acc.loggedin p").innerText = adr
  if (updateBalance) {
  AccInfo(adr).then(inf => {
  if (inf["error"] != null) {
    sel("sidepanel acc inf span").innerText = "0.00"
    return
  } else {
    sel("sidepanel acc inf span").innerText = parseFloat(fromRaw(inf["balance"]).toString()).toFixed(2)
    bal = fromRaw(inf["balance"]).toString()
  }
})}}
  catch {
    sel("acc.loggedin p").innerText = adr
    sel("acc.loggedin inf span").innerText = "0.00"
    return
  }
}
function showSeed() {
  openMenu("#seedMenu")
  sel("#seedMenu").querySelector("seed").innerText = seed
}
function copySeed() {
  navigator.clipboard.writeText(seed).then(() => {
    openMenu("#copiedMenu")
  }).catch(err => {
    error("Could not copy to clipboard, make sure your browser supports it")
  })
}
const receiveBananoDeposits = async () => {
  return await window.bananocoinBananojs.receiveBananoDepositsForSeed(
    seed,
    0,
    adr
    );
};
const withdrawBanano = async (withdrawAccount, withdrawAmount) => {
  return await window.bananocoinBananojs.sendBananoWithdrawalFromSeed(
    seed,
    0,
    withdrawAccount,
    withdrawAmount
  );
};
const withdrawRawBanano = async (withdrawAccount, withdrawAmount) => {
  return await window.bananocoinBananojs.sendRawBananoWithdrawalFromSeed(
    seed,
    0,
    withdrawAccount,
    withdrawAmount
  );
};
function logout(confirm) {
  if (confirm) {
    window.localStorage.setItem("seed", "")
    window.location.href = "/"
  } else {
    openMenu("#confirmLogout")
  }
}