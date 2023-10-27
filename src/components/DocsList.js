export default function DocsList({
  $target,
  initialState,
  onClickAddRoot,
  onClickAddSub,
  onClickDeleteDoc,
  onDocumentClick
}) {
  const $list = document.createElement('div')
  $list.className = 'documents-list'
  $target.appendChild($list)

  if (Array.isArray(initialState) && initialState) {
    this.state = initialState
  }

  this.setState = nextState => {
    if (nextState) {
      this.state = nextState
      this.render()
    } else {
      throw new Error('nextState 값 오류!')
    }
  }

  const renderList = (document) => {
    if (!document) {
      console.log('document가 없습니다')
      return
    }
    const { id, title, documents } = document
    return `
      <ul>
        <li data-id="${id}" class="listItem">
          <label for="check"></label>
          <input type="checkbox" name="hideToggle" id="hideCheck" />${!title ? '제목 없음' : title}
          <span class="button-group">
            <button class="deleteDocButton">x</button>
            <button class="addSubDocButton">+</button>
          </span>
        </li>
          ${(documents && documents.length > 0)
          ? documents.map((document) => renderList(document)).join('') 
          : `<ul><li class="endList">하위 페이지 없음</li></ul>`}
      </ul>
    `
  }
  const renderButton = () => {
    return `
    <div role="button" class="addRootDocButton">
      + 페이지 추가
    </div>
    `
  }

  this.render = () => {
    $list.innerHTML = (this.state.length === 0) 
    ? renderButton()
    : `
      <div role="listTree">
        ${this.state.map(document => renderList(document)).join('')
        + renderButton()}
      <div>
      `
    
    $target.appendChild($list)
  }

  $list.addEventListener('click', e => {
    const { className } = e.target
    const $li = e.target.closest("li")
    
    // $li 버튼 이벤트
    if ($li) {
      const { id } = $li.dataset
      if (className === 'addSubDocButton') {
        onClickAddSub(id)
      } else if (className === 'deleteDocButton') {
        onClickDeleteDoc(id)
      } else if (className === 'listItem') {
        onDocumentClick(parseInt(id))
      }
    }
    // 페이지 추가 버튼
    if (className === 'addRootDocButton') {
      onClickAddRoot()
    }
    if (e.target.name) {
      // 하위 목록 숨기기
      if (e.target.name === 'hideToggle') {
        e.target.checked
        ? e.target.parentNode.nextElementSibling.style.display = 'none'
        : e.target.parentNode.nextElementSibling.style.display = 'block'
      }
    }
  })
}