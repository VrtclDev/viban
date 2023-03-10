const types = {
  "video":"ban_3ebi973te91jr8siknqbxb1b6r63uubemaqtmeah1yb6fhpy8bbkgxojtdfr"
}
const uploadPost = async (e, type) => {
  if (!type) return new Error("type_not_specified")
  for (i in e) e[i] = e[i].replaceAll("https://","").replaceAll("http://", "").replaceAll(":", "\\:")
  e = encodeMSG(e.join(":"))
  console.log(e)
  for (i in e) {
    if (e.length-1 == i) {
      return await ban.withdraw(types[type], 0.01, ban.pubAdr(e[i]))
    } else {
      await ban.change(ban.pubAdr(e[i]))
    }
  }
}