import Leef from "../components/common/Leef.js";

import { push } from "../router.js";
import { useDocsIndex } from "../utils/store.js";

export default function ({ $parent }) {
  const $element = document.createElement("section");
  $element.setAttribute("id", "leef-view");

  const clickHandler = (id) => {
    push(`/documents/${id}`);
  };

  this.render = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      $element.innerHTML = "";
      const leefData = useDocsIndex.state.flattenArrayData;

      if (leefData && leefData.length > 0) {
        leefData.forEach(
          (leef) =>
            new Leef({
              $parent: $element,
              data: leef.title,
              onClick: () => clickHandler(leef.id),
            })
        );
      }

      $parent.appendChild($element);
    }
  };
}
