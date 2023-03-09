const navigate = () => {
  document.body.querySelector("navmenu").classList.toggle("open")
}
const confirmationPrompt = (title, text, returnInputs=false) => {
  const e = document.body.querySelector("#popup-menu").cloneNode(true)
  const shadow = document.body.querySelector("shadow")
  e.querySelector("t").innerText = title
  e.querySelector("inf").innerHTML = text
  e.setAttribute("hide", "")
  shadow.setAttribute("hide", "")
  document.body.appendChild(e)
  const promise = new Promise((resolve) => {
  e.querySelector("btn[t='n']").addEventListener("click", () => {
    resolve(false)
    e.remove()
    shadow.setAttribute("hide","y")
  })
  e.querySelector("btn[t='y']").addEventListener("click", () => {
    if (returnInputs) {
      resolve(e.querySelectorAll("input"))
    } else {
      resolve(true)
    }
    e.remove()
    shadow.setAttribute("hide","y")
  })
  })
  return promise
}