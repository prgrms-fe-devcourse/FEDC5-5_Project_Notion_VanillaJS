/*
 * NotionTitle
 * - Title : notion 이름
 * */
import { push } from '../../utils/router.js';
import createDOM from '../../utils/createDOM.js';

export default function NotionTitle({ $target, title }) {
  const $notionTitle = createDOM({ $target, tagName: 'h1', content: title, style: 'NotionTitle' });

  $notionTitle.addEventListener('click', e => {
    push('/');
  });
}
