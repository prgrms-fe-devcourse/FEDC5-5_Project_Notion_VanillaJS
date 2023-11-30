export const checkCurrentDocument = (parent, currentId) => {
  const { pathname } = window.location;
  if (pathname.indexOf('/documents/') === 0) {
    const [, , postId] = pathname.split('/');
    if (Number(postId) === currentId) {
      parent.querySelector(`span[data-id="${currentId}"]`).style.color = 'blue';
    }
  }
};
