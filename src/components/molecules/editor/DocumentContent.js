/*
 * DocumentContent
 * - Content : 문서 내용 (Editor)
 */

import { moveCursorToEnd } from '../../../utils/editerUtils.js';
import createDOM from '../../../utils/createDOM.js';

export default function DocumentContent({ $target, content, onEditContent, isDisabled = false }) {
  const $content = createDOM({ $target, style: 'DocumentContent', setAttribute: [['contenteditable', 'true']] });

  $content.addEventListener('input', e => {
    this.setState({ ...this.state, content: e.target.innerHTML });
    onEditContent(this.state.content);
    moveCursorToEnd($content);
  });

  this.state = { content, isDisabled };
  this.setState = nextState => {
    const content = nextState.content.startsWith('<div>') ? nextState.content : `<div>${nextState.content}</div>`;
    this.state = { ...nextState, content };
    this.render();
  };

  this.render = () => {
    if (this.state.isDisabled) {
      $content.innerHTML = this.state.content;
      $content.removeAttribute('contenteditable');
      return;
    }
    $content.setAttribute('contenteditable', 'true');

    const richContent = this.state.content
      .split('<div>')
      .map(line => {
        if (line.indexOf('# ') === 0) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.indexOf('## ') === 0) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.indexOf('### ') === 0) {
          return `<h3>${line.substring(3)}</h3>`;
        }
        return line;
      })
      .join('<div>');

    $content.innerHTML = richContent;
  };

  this.render();
}
