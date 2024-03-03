import { addEvent, appendChildAll, createDOM } from '../../../utils/dom.js';
// import './style.scss';

export default function Modal() {
  const $modalOverlay = document.querySelector('.modal-overlay');

  const $modal = createDOM('div', 'modal');

  const $modalTitle = createDOM('h3', 'modal-title', '', '도움말');

  const $modalContent = createDOM(
    'div',
    'modal-content',
    `
    <ul>
      <li>페이지 추가로 새로운 문서를 추가할 수 있어요!</li>
      <li>문서 리스트와 에디터 사이에 <strong>스플리터</strong>가 있어요!</li>
      <li>에디터에서 한글은 <strong>자소분리</strong>가 발생해요.😭</li>
      <li>자소분리는 브라우저 문제에요.</li>
      <li>문서를 접었다 폈다 할 수 있어요!</li>
    </ul>
    `,
  );
  const $closeButton = createDOM(
    'button',
    'close-button',
    `<i class="fa-solid fa-xmark"></i>`,
  );

  appendChildAll($modal, [$closeButton, $modalTitle, $modalContent]);
  appendChildAll($modalOverlay, [$modal]);

  this.render = () => {
    $modalOverlay.style.display = 'block';
  };

  this.handleCloseModal = () => {
    $modalOverlay.style.display = 'none';
    $modalOverlay.removeChild($modal);
  };

  this.handleClickOverlay = (e) => {
    const { target } = e;
    if (target === $modalOverlay) {
      $modalOverlay.style.display = 'none';
      $modalOverlay.removeChild($modal);
    }
  };

  addEvent({
    $dom: $modal,
    className: 'close-button',
    type: 'click',
    callback: this.handleCloseModal,
  });
  addEvent({
    $dom: window,
    className: null,
    type: 'click',
    callback: this.handleClickOverlay,
  });

  this.render();

  // 모달 제거 시, removeEventListener를 해주어야 한다.
}
