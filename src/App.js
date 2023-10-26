import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }){

  const postsPage = new PostsPage({$target})
  const postEditPage = new PostEditPage({
    $target,  
    onChange: () => postsPage.setState()
  })

  this.route = async() => {
    

    const $postsPage = $target.querySelector("div.posts-page");
    if(!$postsPage) {
      await postsPage.setState()
    }

    const {pathname} = window.location
    const [, , selectedPostId] = pathname?.split('/') || '';
    await postEditPage.setState({selectedPostId})
    
  }

  window.addEventListener('popstate', e => {
    this.route()
  })

  this.route()

  initRouter(() => this.route())
}