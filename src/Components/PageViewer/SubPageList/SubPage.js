import SubPageList from "./SubPageList.js";
import SubPageTitle from "./SubPageTitle.js";

export default function SubPage({ target, state }) {
  const subPageElement = document.createElement("div");
  subPageElement.setAttribute("class", "pageViewer_subPage");
  target.appendChild(subPageElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { title, documents } = this.state;

    /* 필요한 데이터 분배 */
    subPageTitle.setState(title);
    subPageList.setState(documents);
  };

  subPageElement.replaceChildren();

  /* Current Page Title */
  const subPageTitle = new SubPageTitle({
    target: subPageElement,
    state: "",
  });

  /* Current Page Child List */
  const subPageList = new SubPageList({
    target: subPageElement,
    state: [],
  });

  this.getElement = () => {
    return subPageElement;
  };
}
