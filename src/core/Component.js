export default class Component {
  $target;
  state;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  createDom() {}

  setEvent() {}

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (e) => {
      if (!e.target.closest(selector)) return false;

      callback(e);
    });
  }

  render() {
    this.createDom();
  }
}
