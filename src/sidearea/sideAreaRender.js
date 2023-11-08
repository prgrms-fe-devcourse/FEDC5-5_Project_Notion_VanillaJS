import SideAreaPage from "./sideAreaPage.js";
import SideAreaHeader from "./sideAreaHeader.js";
import SideAreaFooter from "./sideAreaFooter.js";

const $ = document;
export default function SideAreaRender({
  $target,
  initialState,
  onClickPage,
  onClickCreateNewPageButton,
  onClickDeleteButton,
  onReturnMainPage,
}) {
  this.state = initialState;

  new SideAreaHeader({ $target, onReturnMainPage });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const sideAreaPage = new SideAreaPage({ $target, initialState, onClickPage, onClickCreateNewPageButton, onClickDeleteButton });

  new SideAreaFooter({ $target, onClickCreateNewPageButton });

  this.render = () => {
    sideAreaPage.setState(this.state);
  };
  this.render();
}
