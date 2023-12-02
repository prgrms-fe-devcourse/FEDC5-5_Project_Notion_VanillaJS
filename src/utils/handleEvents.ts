import { navigateTo } from "./navigate";

export const handleClickAnchor = (event: Event) => {
  const target = event.target as HTMLElement;

  const $anchor = target.closest("a") as HTMLAnchorElement;

  if (!$anchor) return;

  event.preventDefault();
  navigateTo($anchor.href);
};
