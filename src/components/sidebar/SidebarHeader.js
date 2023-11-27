export default function SidebarHeader({
    $target,
    initialState = ''
}) {
    const $sidebarHeader = document.createElement('div')
    $sidebarHeader.className = 'sidebar_header'
    $target.appendChild($sidebarHeader)

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }


    this.render = () => {
        $sidebarHeader.innerHTML = `<p>${this.state.name}</p>`;
    }

    this.render()
}
