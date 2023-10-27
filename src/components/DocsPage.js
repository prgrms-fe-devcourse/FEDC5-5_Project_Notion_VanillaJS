import DocsList from './DocsList.js'
import { request } from '../utils/api.js'

export default function DocsPage({ 
  $target,
  onDocumentClick
 }) {
  const $page = document.createElement('div')
  $page.id = 'sidebar'
  
  // DocsList 컴포넌트 생성
  const docsList =  new DocsList({
    $target: $page,
    initialState: [],
    onClickAddRoot: () => {
      // fetch 루트 추가
      console.log('루트페이지 추가 눌림')
    },
    onClickAddSub: (id) => {
      // fetch 하위 추가
      console.log('하위페이지 추가 눌림')
    },
    onClickDeleteDoc: (id) => {
      // fetch 하위 삭제
      console.log('하위페이지 삭제 눌림')
    },
    onDocumentClick
  })

  const fetchDocuments = async () => {
    const documents = await request(`/documents`)

    docsList.setState(documents)
  }

  this.render = () => {
    fetchDocuments()
    $target.appendChild($page)
  }
  this.render()

  // $page.addEventListener('click', (e) => {
  //   if (e.target.className === 'listItem') {
  //     const id = parseInt(e.target.dataset.id)
  //     onDocumentClick(id)
  //   }
  // })
}