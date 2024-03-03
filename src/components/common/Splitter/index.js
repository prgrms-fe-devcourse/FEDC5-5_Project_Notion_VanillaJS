// import './style.scss';

export default function Splitter({ $target }) {
  const $splitter = document.createElement('div');
  $splitter.className = 'splitter';
  $splitter.dataset.direction = 'horizontal';

  $target.appendChild($splitter);

  document.addEventListener('DOMContentLoaded', function () {
    const resizable = function (splitter) {
      const direction = splitter.getAttribute('data-direction') || 'horizontal';
      const prevSibling = splitter.previousElementSibling;
      const nextSibling = splitter.nextElementSibling;

      // The current position of mouse
      let x = 0;
      let y = 0;
      let prevSiblingHeight = 0;
      let prevSiblingWidth = 0;

      // Handle the mousedown event
      // that's triggered when user drags the splitter
      const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        const rect = prevSibling.getBoundingClientRect();
        prevSiblingHeight = rect.height;
        prevSiblingWidth = rect.width;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        switch (direction) {
          case 'vertical':
            const h =
              ((prevSiblingHeight + dy) * 100) /
              splitter.parentNode.getBoundingClientRect().height;
            prevSibling.style.height = `${h}%`;
            break;
          case 'horizontal':
          default:
            const w =
              ((prevSiblingWidth + dx) * 100) /
              splitter.parentNode.getBoundingClientRect().width;
            prevSibling.style.width = `${w}%`;
            break;
        }

        const cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
        splitter.style.cursor = cursor;
        document.body.style.cursor = cursor;

        prevSibling.style.userSelect = 'none';
        prevSibling.style.pointerEvents = 'none';

        nextSibling.style.userSelect = 'none';
        nextSibling.style.pointerEvents = 'none';
      };

      const mouseUpHandler = function () {
        splitter.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        prevSibling.style.removeProperty('user-select');
        prevSibling.style.removeProperty('pointer-events');

        nextSibling.style.removeProperty('user-select');
        nextSibling.style.removeProperty('pointer-events');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      // Attach the handler
      splitter.addEventListener('mousedown', mouseDownHandler);
    };

    // Query all splitters
    document.querySelectorAll('.splitter').forEach(function (ele) {
      resizable(ele);
    });
  });
}
