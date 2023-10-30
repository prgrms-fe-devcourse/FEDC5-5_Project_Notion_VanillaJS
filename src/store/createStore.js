export default class createStore {
  #state = {}
  #listeners = []
  #reducer

  constructor(state, reducer) {
    this.#state = state
    this.#reducer = reducer
  }

  getState() {
    return { ...this.#state }
  }

  subscribe(func) {
    this.#listeners.push(func)
  }

  publish() {
    this.#listeners.forEach(func => func())
  }

  async dispatch(action) {
    this.#state = await this.#reducer(this.#state, action)
    this.publish()
  }
}
