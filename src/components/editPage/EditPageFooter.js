import {
    push
} from "../../utils/router.js"

export default function EditPageFooter({
    $target,
    initialState = {
        title: '',
        content: ''
    },
}) {
    const $footer = document.createElement('footer');
    $footer.className = 'editPage_footer';
    $target.appendChild($footer);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }


    const renderLinkButton = (documents) => {
        return `
        <div> 
            ${documents.map(list =>     
                `<button data-id=${list.id} name="childDocumentButton" >${list.title}</button>
                `).join('')}
        </div>
    `
    };


    this.render = () => {
        if (this.state.documents && this.state.documents.length > 0) {
            $footer.innerHTML = renderLinkButton(this.state.documents);
        } else {
            $footer.innerHTML = ''
            return
        }
    }


    $footer.addEventListener('click', (e) => {
        const $button = e.target.closest('button')
        const {
            id
        } = $button.dataset
        push(`/documents/${id}`)
    });


    this.render()

}
