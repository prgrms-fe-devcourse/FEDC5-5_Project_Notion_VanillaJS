import { push } from "./router.js"

export default function PostList({ $target, initialState, onToggle, onDelete, onAdd, onSelect }){
  const $postList = document.createElement('div');
  $postList.classList.add('post-list');
  $target.appendChild($postList);

  this.state = initialState
  
  this.setState = (nextState) => {
    this.state = nextState
    this.render();
  }
  
  this.render = () => {
    Array.isArray(this.state.postList) ? 
      this.state.postList.length > 0 ?
        $postList.innerHTML = `
          ${this.state.postList.map(post => renderTree(post, '')).join('')}
          <div class="post-add"> + </div>

          <div class="modal-content" style="
            display:${this.state.modalState ? 'block' : 'none'}; 
            top:${this.state.selectedPost.top};
            left:${this.state.selectedPost.left};
            position: absolute;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            width: 170px; 
            height: 50px; 
          ">
            <div class="post-delete">삭제</div>
          </div>
        `
      : $postList.innerHTML = `
          <div>
            <div>아무것도 없어용</div>
            <div class="post-add"> + </div>
          </div>
        `
    : '';
  }

  const renderTree = (post, path = '') => {
    path = `${path}${path ? '-' : ''}${post.id}`;
    const isToggled = post.isToggled || false;
    const depth = path.match(/-/g)?.length || 0;
    const isVisible = depth === 0 ? true : post.isVisible || false;
    const tabLevel = '&nbsp;'.repeat(depth * 2);
    
    const nodeHTML = renderTreeNode(post, path, isToggled, isVisible, tabLevel);
    const childHTML = post.documents.map(child => renderTree(child, path)).join('');
    return `${nodeHTML}${childHTML}`;
  }

  const renderTreeNode = (post, path, isToggled, isVisible, tabLevel) => {
    return `
      <div data-id="${post.id}" data-path="${path}" style="display: ${isVisible ? 'block' : 'none'}">
        <span class="post-toggle-button">${tabLevel}${isToggled ? '&#5167;' : '&#5171;'}</span>
        <span class="post-title">${post.title}</span>
        <span class="post-load-more-button"> ··· </span>
        <span class="post-add-child"> + </span>
        ${isVisible && isToggled && post.documents.length === 0 ? `<div>${tabLevel}하위 페이지 없음</div>` : ''}
      </div>
    `;
  }
      
  $target.addEventListener('click', async (e) => {
    const $div = e.target.closest('div')
    
    if($div){
      const {className} = e.target
      const {id, path} = $div.dataset;

      if(className === 'post-toggle-button'){
        // 포스트 토글
        onToggle(path)

      }else if(className === 'post-title'){
        // 포스트 제목
        const {pathname} = window.location
        const [, , selectedPostId] = pathname.split('/')
        if(selectedPostId !== id){
          onSelect(id)
        }
        
      }else if(className === 'post-load-more-button'){
        // 포스트 더보기
        const modalResult = $postList.querySelector(".modal-content").style.display === 'none';
        const button = e.target;
        toggleModal(id, path, button.offsetTop + button.offsetHeight, button.offsetLeft, modalResult);

      }else if(className === 'post-add-child') {
        // 자식 추가 버튼
        onAdd(id, path)

      }else if(className === 'post-delete'){
        // 삭제 버튼
        onDelete(this.state.selectedPost.id, this.state.selectedPost.path, findChild(this.state.selectedPost.path));
        toggleModal()
        push(`/`)
        
      }else if(className === 'post-add'){
        // 1단계 추가 버튼
        onAdd()

      }
    }

  })

  const findChild = (path) => {
    return Array.from($postList.querySelectorAll('div[data-path*="'+path+'"]'))
                .map(div => div.getAttribute('data-id'));
  }

  const toggleModal = (id = '', path = '', top = '0', left = '0', modalResult = false) => {
    this.setState({
      ...this.state,
      selectedPost: { id, path, top: top + 'px', left: left + 'px' },
      modalState: modalResult
    });
  }

  this.render();
}