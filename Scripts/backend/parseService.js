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
const prepareIns = (ins) => {
  ins = ins.reverse()
  var hashes = {}
  for (i in ins) {
    if (ins[i].startsWith("ban_")) {
      ins[i] = publicKey(ins[i])
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
const readIns = (ins) => {
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
function convertMSG(e) {
  return readIns(prepareIns(e))
}
function isCmd(e) {
  return [Object.keys(cmdsInv).includes(e), cmdsInv[e]]
}
