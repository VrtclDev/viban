window.addEventListener("load", async () => {
  await initTheme()
  await login()
  await loadVideos()
  await initEmotes()
  await initVjs()
})