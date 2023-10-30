const urlchange = new CustomEvent("urlchange")
export const urlchangeHandler = pathname => {
  history.pushState(null, null, pathname)
  window.dispatchEvent(urlchange)
}
