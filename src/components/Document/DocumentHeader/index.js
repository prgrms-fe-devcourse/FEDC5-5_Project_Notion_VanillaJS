import { push } from '../../../router/router.js';
import { addEvent, appendChildAll, createDOM } from '../../../utils/dom.js';
// import './style.scss';

export default function DocumentHeader({ $target, onClickPageAddButton }) {
  const $documentHeader = createDOM({
    tag: 'div',
    className: 'document-header',
  });
  const $mainHeader = createDOM({ tag: 'div', className: 'main-header' });
  const $logo = createDOM({
    tag: 'div',
    className: 'logo',
    innerHTML:
      '<img src="./images/notion-logo.svg" alt="Nution" class="logo-img" />',
  });
  const $logoTitle = createDOM({
    tag: 'div',
    className: 'logo-title',
    innerHTML: "휘식's Nution",
  });
  const $subHeader = createDOM({ tag: 'div', className: 'sub-header' });
  const $pageName = createDOM({
    tag: 'div',
    className: 'page-name',
    innerHTML: '개인 페이지',
  });
  const $group = createDOM({ tag: 'div', className: 'group' });

  $group.style.cursor = 'pointer';

  const $addButton = createDOM({
    tag: 'button',
    className: 'page-add-button',
    innerHTML: '<i class="fa-solid fa-plus"></i>',
  });
  const $span = createDOM({
    tag: 'span',
    className: 'group-text',
    innerHTML: '페이지 추가',
  });

  appendChildAll($mainHeader, [$logo, $logoTitle]);
  appendChildAll($group, [$addButton, $span]);
  appendChildAll($subHeader, [$pageName, $group]);
  appendChildAll($documentHeader, [$mainHeader, $subHeader]);
  appendChildAll($target, [$documentHeader]);

  this.handleAddPage = (e) => {
    const { target } = e;
    if (
      target.matches('.group') ||
      target.matches('.group-text') ||
      target.matches('.page-add-button')
    )
      if (onClickPageAddButton) {
        onClickPageAddButton();
      }
  };

  // TODO: 로고 클릭 시, 선택된 문서 페이지 초기화
  // this.handleClickLogo = (e) => {
  //   const { target } = e;
  //   if (target.matches('.logo') || target.matches('.logo-img')) {
  //     push('/');
  //   }
  // };

  // this로 핸들러를 callback으로 넘겨주면, callback이 function이 아니라는 에러가 발생한다.
  addEvent({
    $dom: $documentHeader,
    className: 'group',
    type: 'click',
    callback: this.handleAddPage,
  });
  addEvent({
    $dom: $documentHeader,
    className: 'logo',
    type: 'click',
    callback: this.handleClickLogo,
  });
}
