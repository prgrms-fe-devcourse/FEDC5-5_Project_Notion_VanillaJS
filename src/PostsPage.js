import {request} from "./api.js";
import PostList from "./PostList.js";
import { push } from "./router.js"

export default function PostsPage({$target}){
  const $page = document.createElement('div');
  $page.classList.add('posts-page');

  const postList = new PostList({
    $target : $page,
    initialState: {
      postList:[],
      selectedPost: {
        id:'',
        path:'',
        top:'0px',
        left:'0px',
      },
      modalState: false
    },
    onToggle: async (path) => {
      const allPath = path.split('-');
      const nowPost = returnPathList([...allPath], postList.state.postList)
      nowPost.isToggled = typeof nowPost.isToggled === 'undefined' ? true : !nowPost.isToggled;
      childToggle(nowPost.documents, nowPost.isToggled);
      const updateState = returnMap(postList.state.postList, [...allPath], nowPost);
      const nextState = postList.state.postList.map(post => post.id === updateState.id ? updateState : post)

      postList.setState({
        ...postList.state,
        postList: nextState
      })
    },
    onDelete: async(id, path, child) => {
      const allPath = path.split('-');
      let nextState;
      if(allPath.length === 1){
        nextState = postList.state.postList.filter(post => parseInt(post.id) !== parseInt(id));
      }else{
        const parentPost = returnPathList([...allPath].slice(0, -1), postList.state.postList);
        const siblingPost = parentPost.documents.filter(post => parseInt(post.id) !== parseInt(id));
        parentPost.documents = siblingPost
  
        const updateState = returnMap(postList.state.postList, [...allPath].slice(0,-1), parentPost);
        nextState = postList.state.postList.map(post => post.id === updateState.id ? updateState : post)
      }

      postList.setState({
        ...postList.state,
        postList: nextState
      })

      await Promise.all(child.map(async (id) => {
        await request(`/documents/${id}`, {
          method: 'DELETE'
        });
      }));
      
    },
    onAdd: async(id = null, path) => {
      const createdPost = await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({
          'title': '제목 없음',
          'parent': id
        })
      })

      createdPost.documents = [];

      if(id === null){
        createdPost.isVisible = true
        postList.setState({
          ...postList.state,
          postList: [...postList.state.postList, createdPost]
        });
      }else{
        const allPath = path.split('-');
        const nowPost = returnPathList([...allPath], postList.state.postList);
        nowPost.isToggled = true;
        nowPost.documents.push(createdPost);
        const updateState = returnMap(postList.state.postList, [...allPath], nowPost);
        const nextState = postList.state.postList.map(post => post.id === updateState.id ? updateState : post)
        childToggle(nowPost.documents, nowPost.isToggled);
        postList.setState({
          ...postList.state,
          postList: nextState
        })
        
      }

      push(`/selectedPostId/${createdPost.id}`)
      postList.setState({
        ...postList.state,
        selectedPostId: createdPost.id
      })
    },
    onSelect: async(id) => {
      push(`/selectedPostId/${id}`)
      postList.setState({
        ...postList.state,
        selectedPostId: id
      })
    }
  })

  // 변경된 것 포함해서 최상위 값 return
  const returnMap = (postList, path, child) => {
    if(path.length === 1) return child;
    const id = path.pop();
    const parent = returnPathList([...path], postList)
    const findIndex = parent.documents.findIndex(post => parseInt(post.id) === parseInt(id));
    parent.documents[findIndex] = child
    return returnMap(postList, path, parent)
  }

  // 마지막 path의 post return
  const returnPathList = (allPath, postList) => {
    let nextPath = allPath.shift();
    let nextPost = postList.find(post => post.id == nextPath);
    if (allPath.length === 0) return nextPost;
    return nextPost ? returnPathList(allPath, nextPost.documents) : null;
  }

  // 해당 toggle 값에 따른 자식들 visible 변경
  function childToggle(documents, state) {
    if (!Array.isArray(documents)) return;
    for (const document of documents) {
      document.isVisible = state;
      document.isToggled = false;
      if (!state && Array.isArray(document.documents) && document.documents.length > 0) {
        childToggle(document.documents, state); 
      }
    }
  }

  this.setState = async () => {
    const posts = await request('/documents');
    postList.setState({
      ...postList.state,
      postList: posts
    })
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }
}