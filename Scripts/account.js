var rpc = "https://kaliumapi.appditto.com/api"
var ws = "wss://public.node.jungletv.live/ws"
const banano = window.bananocoinBananojs
banano.setBananodeApiUrl(rpc)
function genSeed() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
var seed = window.localStorage.getItem("seed")
var adr
var bal = 0.00
function setupInfo() {
  if (seed == null) {
    return
  }
  banano.getBananoAccountFromSeed(seed, 0).then(d => {
    adr = d
    try {
      updatePanel(true)
    } catch {}
  });
}
setupInfo()
function updateInfo(d=null) {
  if (seed == null) {
    return
  }
  banano.getBananoAccountFromSeed(seed, 0).then(a => {
    adr=a
    root.style.setProperty("--pfp", `url(https://monkey.banano.cc/api/v1/monkey/${adr})`)
  })
  var root = document.documentElement
   if (d != null && d["pendingBlocks"] != "") {
      updatePanel(true)
    }
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
    banano.getBananoAccountFromSeed(input, 0).then(acc => {
      sel("#confirmImport").querySelector("img").setAttribute("src", `https://monkey.banano.cc/api/v1/monkey/${acc}`)
    })
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
  sel("sidepanel acc p").innerText = adr
  if (updateBalance) {
  banano.getAccountInfo(adr, true).then(inf => {
  if (inf["error"] != null) {
    sel("sidepanel acc inf span").innerText = "0.00"
    return
  } else {
    sel("sidepanel acc inf span").innerText = parseFloat(inf["balance_decimal"]).toFixed(2)
    bal = inf["balance_decimal"]
  }
})}}
  catch {
    sel("sidepanel acc p").innerText = adr
    sel("sidepanel acc inf span").innerText = "0.00"
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
updateInfo()
setInterval(function() {
  receiveBananoDeposits().then(d => {
    updateInfo(d)
  })
}, 10000)
function sel(e) {
  return document.body.querySelector(e)
}
function logout(confirm) {
  if (confirm) {
    window.localStorage.setItem("seed", "")
    window.location.href = "/"
  } else {
    openMenu("#confirmLogout")
  }
}