const getPostFromHash = async (hash) => {
  var author = (await blockAcc(hash))["account"]
  var b = await accHistory(author, "1", hash, true)
  b = b["history"][0]
  var previous = b["previous"]
  var finish = false
  var res = []
  while (!finish) {
    finish = true
    var h = await accHistory(author, "1", previous, true)
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
    }
  }
  return promise
}
