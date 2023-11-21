import { TAG } from "../../constants/tag.js";
import { PATH } from "../../routes/path.js";
import { navigate } from "../../routes/router.js";
import { createCustomElement } from "../../utils/dom.js";
import { CSS_SELECTOR } from "../cssSelector.js";

export default function ProfileHeader({ $target }) {
  const $profileImage = createCustomElement({
    tag: TAG.IMG,
    props: {
      src: "https://www.notion.so/image/https%3A%2F%2Flh3.googleusercontent.com%2F-Fc_eH0ByLIQ%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FAMZuucmxq1d1ig7XroYSImH0jjXPAOakfw%2Fphoto.jpg?table=space&id=77119d9a-969a-4008-afd9-d9f0ddf7cc9d&spaceId=77119d9a-969a-4008-afd9-d9f0ddf7cc9d&width=40&userId=c3699d96-e7bd-441c-b3c2-fc059b64a0bc&cache=v2",
    },
  });

  const $profileTitle = createCustomElement({
    tag: TAG.SPAN,
    props: {
      textContent: "수현's Notion",
    },
  });

  const $profileHeader = createCustomElement({
    tag: TAG.DIV,
    props: {
      id: CSS_SELECTOR.HEADER.PROFILE,
    },
    children: [$profileImage, $profileTitle],
  });

  $target.appendChild($profileHeader);

  $profileHeader.addEventListener("click", (event) => {
    navigate(PATH.ROOT);
  });
}
