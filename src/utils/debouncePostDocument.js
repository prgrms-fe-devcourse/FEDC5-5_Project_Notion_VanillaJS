import { request } from '../services/api.js';
import { removeItem } from './storage.js';

export const debouncePostDocument = (timer, state, delayTime) => {
  const { id, title, content } = state;
  if (timer !== null) clearTimeout(timer);
  timer = setTimeout(async () => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: {
        title,
        content,
      },
    });
    removeItem(`SAVE_DOCUMENT_TITLE_KEY-${id}`);
  }, delayTime);
  return timer;
};
