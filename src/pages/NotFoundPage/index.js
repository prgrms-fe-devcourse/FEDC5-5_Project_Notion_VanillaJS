import { createDOM } from '../../utils/dom.js';
// import './style.scss';

export default function NotFoundPage({ $target }) {
  const $notFoundPageContainer = createDOM({
    tagName: 'div',
    className: 'not-found-page-container',
    innerHTML: `
      <h1 class='not-found-title'>선택된 문서가 없어요!</h1>
      <h3 class='not-found-sub-title'>문서를 선택해주세요!</h3>
    `,
  });

  this.show = () => {
    if ($target.contains($notFoundPageContainer)) return;
    $target.appendChild($notFoundPageContainer);
  };

  this.close = () => {
    if ($target.contains($notFoundPageContainer)) {
      $target.removeChild($notFoundPageContainer);
    }
  };
  $target.appendChild($notFoundPageContainer);
}
