export default function DocumentTree({ $target, initialState }) {
    const $documentTree = document.createElement('div')
    $documentTree.className = 'documentTree'

    $target.appendChild($documentTree)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    const renderDocumentTree = childDocuments => {
        return `
            <ul class="documentWrapper">
            ${childDocuments.map(document => {
                const {id, title, documents} = document
                return `
                        <li data-id=${id} class="document-item" >
                            <div class="document-item-div"> 
                                <div class="arrow-button" data-id=${id} data-name="arrowButton">
                                    ${documents!=null && documents.length>0 
                                        ? '<input type="button" class="arrow-down">'
                                        : '<input type="button" class="arrow-right">'
                                    }
                                </div>
                                <span class="document-title">${title !== '' ? title : '제목 없음'}</span>
                                <input type="button" class="add-button" data-id=${id} data-name="addButton">
                                <input type="button" class="delete-button" data-id=${id} data-name="deleteButton">
                            </div>
                            ${documents!=null && documents.length > 0 
                            ? renderDocumentTree(documents)
                            : ''
                            
                        }
                        </li>
                        `
                    }).join('')}
                    </ul>
                `
    }

    this.render = () => {
        $documentTree.innerHTML = `${renderDocumentTree(this.state)}`
    }

    this.render()
}