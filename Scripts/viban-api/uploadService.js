const uploadMSG = (e) => {
  e = e.match(/.{64}|.{1,64}/g);
  for (i in e) {
    e[i] = getAdr(e[i])
  }
  return e
}