import { createCustomElement } from "../utils/dom.js";
import MyWorkSpace from "./MyWorkSpace/MyWorkSpace.js";
import ProfileHeader from "./Common/ProfileHeader.js";
import { TAG } from "../constants/tag.js";
import { CSS_SELECTOR } from "./cssSelector.js";

export default function SideBar({ $target, navigateToDocument }) {
  const $sideBar = createCustomElement({
    tag: TAG.NAV,
    props: { id: CSS_SELECTOR.SIDEBAR },
  });

  $target.appendChild($sideBar);

  new ProfileHeader({ $target: $sideBar });

  const $myWorkSpace = new MyWorkSpace({
    $target: $sideBar,
    navigateToDocument,
  });

  this.setState = (nextState) => {
    $myWorkSpace.setState(nextState);
  };
}
