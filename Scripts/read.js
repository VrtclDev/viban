var cmdsInv = {}
cmdsInv["F1"] = "⇜title:"
cmdsInv["F2"] = "⇜description:"
cmdsInv["F3"] = "⇜thumbnail:"
cmdsInv["F4"] = "⇜tags:"
cmdsInv["F5"] = "⇜category:"
cmdsInv["F6"] = "⇜type:video⇜video:"
cmdsInv["F7"] = "⇜type:comment⇜comment:"
cmdsInv["F8"] = "⇜type:profile"
cmdsInv["F9"] = "⇜type:tuit⇜title:"
cmdsInv["FA"] = "⇜nsfw:true"
function getPosts(acc) {
  let promise = new Promise(function(resolve, reject) {
    banano.getAccountsPending([acc], -1).then(b => {
    resolve(Object.keys(b["blocks"][acc]))
    })
  })
  return promise
}
const getProfile = async (acc) => {
  let promise = new Promise(async function(resolve, reject) {
    var pubkey = banano.getAccountPublicKey(links["profile"])
    const h = await banano.getAccountHistory(acc, "1", null, false, [links["profile"]])
    let changes = []
    for (i in h["history"]) {
      var post = await getPostFromHash(h["history"][i]["hash"])
      changes.push([post["title"], post["description"]])
    }
    changes = changes.reverse()
    var finalname
    var finalbio
    for (i in changes) {
    if (changes[i][0] != null) {
      finalname = changes[i][0]
    }
    if (changes[i][1] != null) {
      finalbio = changes[i][1]
    }
    }
    resolve([finalname,finalbio])
  })
  return promise
}
const getComments = (hash) => {
  let promise = new Promise(async function(resolve, reject) {
    var acc = banano.getBananoAccount(hash)
    var h = await banano.getAccountsPending([acc], "10")
    var keys = Object.keys(h["blocks"][acc])
    var res = []
    for (i in keys) {
      var p = await getPostFromHash(keys[i])
      res.push(p)
    }
    resolve(res)
  })
  return promise
}
function prepareIns(ins) {
  ins = ins.reverse()
  var hashes = {}
  for (i in ins) {
    if (ins[i].startsWith("ban_")) {
      ins[i] = banano.getAccountPublicKey(ins[i])
      ins[i] = decodeMsg(ins[i])
    } else if (ins[i].startsWith("⇜")) {
      
    } else {
      ins.splice(i, 1)
    }}
  ins.push("⇜end⇜")
  var result = []
  var temp = []
  for (i in ins) {
  if (ins[i] == "⇜end⇜") {
    result.push(temp)
    temp = []
  } else {
    temp.push(ins[i])
  }
  }
  return result
}
function readIns(ins) {
  var read = []
  for (i in ins) {
    read = read.concat([ins[i]])
  }
  var data = []
  for (i in read) {
    data[i] = {}
    read[i] = read[i].join("").split("⇜")
  }
    for (i in read) {
      for (x in read[i]) {
      if (read[i][x] == "") {
        read[i].splice(x, 0)
      } else {
        var y = [read[i][x].substr(0,read[i][x].indexOf(":")), read[i][x].substr(read[i][x].indexOf(":")+1)]
        data[i][y[0]] = y[1]
      }}
    }
   return data
  }
function convert(e) {
  return readIns(prepareIns(e))
}
function isCmd(e) {
  return [Object.keys(cmdsInv).includes(e), cmdsInv[e]]
}
const getPostFromHash = async function(hash) {
  let promise = new Promise(async function(resolve, reject) {
  var author = await banano.bananodeApi.getBlockAccount(hash)
  author = author["account"]
  var b = await banano.getAccountHistory(author, "1", hash, true)
  b = b["history"][0]
  var previous = b["previous"]
  var finish = false
  var res = []
  while (!finish) {
    finish = true
    var h = await banano.getAccountHistory(author, "1", previous, true)
    var block = h["history"][0]
      previous = block["previous"]
    if (block["subtype"] == "change") {
      res.push(block["representative"])
      finish = false  
    } else if (block["subtype"] == "send" || previous == "0".repeat(64))  {
        finish = true
        res = convert(res)[0]
        res["hash"] = hash
        res["author"] = author
        res["timestamp"] = b["local_timestamp"]
        resolve(res)
    }}
  })
  return promise
}
function sampleProfile() {
  var changes = [
    ["hi", null],
    [null, "im vertical"],
    ["vertical", null]
  ]
  var finalname = ""
  var finalbio = ""
  for (i in changes) {
    if (finalname != "" && finalbio != "") {
      return [finalname, finalbio]
    }
    if (changes[i][0] != null) {
      finalname = changes[i][0]
    }
    if (changes[i][1] != null) {
      finalbio = changes[i][1]
    }
  }
  console.log([finalname, finalbio])
}