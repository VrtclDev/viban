let results
window.addEventListener("load", async () => {
  await initTheme()
  await login()
  if (document.body.className == "video-page") {
    await initVideoService()
    await loadVideo()
  }
  await updatePostData("video", true)
})