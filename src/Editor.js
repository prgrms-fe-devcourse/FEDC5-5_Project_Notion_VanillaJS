export default function Editor({ $target, initialState,onEditing}){
  
  const $editor = document.createElement('div')
  $editor.innerHTML = `
    <textarea class="title" contentEditable="true" style="width:600px;border: 1px solid black; padding: 8px"></textarea>
    <textarea class="content" contentEditable="true" style="width:600px;height:400px;border: 1px solid black; padding: 8px"></textarea>
  `
  
  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    console.log(nextState)
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    const title = $editor.querySelector('.title')
    const content = $editor.querySelector('.content')

    title.value = this.state.title
    content.value = this.state.content

    if(this.state.isBlock){
      title.readOnly = true
      content.readOnly = true
    }else{
      title.readOnly = false
      content.readOnly = false
    }
  }

  this.render()

    $editor.addEventListener("keyup", (e) => {
    const {className} = e.target

    if (className !== undefined) {
      const nextState = {
        ...this.state,
        [className]: e.target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });

}