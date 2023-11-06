export default function useStatePublisher(initState) {
  this.state = { ...initState };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };

    const { subscribers } = this.state;

    if (subscribers.length > 0) {
      subscribers.forEach(($element) => $element.render());
    }
  };
}
