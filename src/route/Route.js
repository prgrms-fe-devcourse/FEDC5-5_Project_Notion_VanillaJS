import { documentStore } from "../store/documentStore.js"

export default class Route {
  constructor() {
    window.addEventListener("urlchange", e => this.route())
    window.addEventListener("popstate", () => this.route())
    this.route()
  }

  route() {
    if (location.pathname === "/") {
      documentStore.dispatch({
        type: "FETCH",
        payload: "/"
      })
    } else {
      documentStore.dispatch({
        type: "FETCH",
        payload: this.parsePathname()
      })
    }
  }

  parsePathname() {
    return location.pathname.split("/").at(-1)
  }
}
