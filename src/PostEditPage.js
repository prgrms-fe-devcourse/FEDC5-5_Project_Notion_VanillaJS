import {request} from './api.js';
import Editor from "./Editor.js";
import {setItem, removeItem, getItem} from './storage.js';

export default function PostEditPage({ $target, onChange }){
  const $page = document.createElement('div')
  $page.classList.add('post-edit-page');
  
  this.state = {
    post : {
      title: '',
      content: '',
      isBlock: false
    },
    selectedPostId : null,
  }

  let postLocalSaveKey = `temp-post-${this.state.selectedPostId}`

  let timer = null

  const editor = new Editor({
    $target: $page, 
    initialState: this.state.post, 
    onEditing: (post) => {
      if(timer !== null) clearTimeout(timer)
      timer = setTimeout(async() => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date()
        })
        
        await request(`/documents/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post)
        })
        removeItem(postLocalSaveKey)
        onChange()
      }, 500)
    }
  })

  this.setState = async nextState => {

    if(window.location.pathname === '/'){
      this.render()
      editor.setState({
        title: '',
        content: '',
        isBlock: true
      })
    }else{
      if(nextState.selectedPostId && this.state.selectedPostId !== nextState.selectedPostId){
        postLocalSaveKey = `temp-post-${nextState.selectedPostId}`
        this.state = nextState
        await fetchPost()
  
        return
      }
  
      this.state = nextState
      this.render()
  
      editor.setState(this.state.post || {
        title: '',
        content: '',
        isBlock: false
      })
      
    }
  }

  this.render = () => {
    $target.appendChild($page)
  }

  
  const fetchPost = async () => {
    const {selectedPostId} = this.state
    const post = await request(`/documents/${selectedPostId}`)

    this.setState({
      ...this.state,
      post
    })
  }
  
}