export default function EditPageHeader({
    $target,
    initialState = {
        title: '',
        content: ''
    }
}){
    const $editpageheader = document.createElement('div')
    $editpageheader.className = 'editPage_header'
    $target.appendChild($editpageheader)
    
    this.state = initialState

    this.setState = (nextState)=> {
        this.state = nextState
        this.render()
    }

    this.render = ()=>{
        $editpageheader.innerHTML = `<button>${this.state.title}</button>`
    }
    this.render()
}
