const actionTemplate = document.createElement('template')
const elementTemplate = document.createElement('template')


actionTemplate.innerHTML = `<button type="button" class='js-modal-container-header-actions-btn' ></botton>`

elementTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="js-modal/js-modal.css">
<div class='js-modal'>
    <div class='js-modal-container'>
        <div class='js-modal-container-header'>
                <span id='js-modal-container-header-title-id'></span>
                <span id='js-modal-container-header-actions-id' class='js-modal-container-header-actions'></span>
        </div>
        <div class='js-modal-container-body'>

            <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur
                eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
            </p>
            <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur
                eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
            </p>
            <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur
                eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
            </p>
            <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur
                eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
            </p>
            <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset
                concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur
                eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
            </p>
        </div>
        <div id="js-modal-container-footer-id" class='js-modal-container-footer'>
        </div>
    </div>
</div>
`


class modalClass extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(elementTemplate.content.cloneNode(true))
        this.configureHeaderCloseAction()
        console.log('js-modal constructor!');
    }

    static get observedAttributes() {
        return ['header-title', 'header-actions', 'footer-actions', 'close-modal']
    }

    configureHeaderCloseAction(){
        let actionPanel = this.shadowRoot.getElementById('js-modal-container-header-actions-id')
        let action = {
            src: 'icons/cross.png',
            alt: 'cross-icon',
            callback: this.closeModal.toString()
        }
        let actionElement = this.createActionElement(action, true)
        actionPanel.appendChild(actionElement)
    }

    openModal = () => {
        this.shadowRoot.lastElementChild.style.display='flex'
    }

    closeModalCallback(){  }

    closeModal = () => {
        this.shadowRoot.lastElementChild.style.display='none'
        this.closeModalCallback();
    }

    createActionElement = (action, headerActionFlag) => {
        let actionElement = actionTemplate.content.cloneNode(true)

        if( headerActionFlag ){
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', action.src)
            imgElement.setAttribute('alt', action.alt)
            imgElement.setAttribute('width', "15")
            imgElement.setAttribute('height', "15")
            actionElement.querySelector("button").appendChild(imgElement);
        }
        else{
            actionElement.querySelector("button").innerHTML = action.label
        }

        let callback = eval(action.callback)
        actionElement.querySelector("button").addEventListener('click', callback)

        return actionElement
    }


    attributeChangedCallback(name) {
        console.log('attributeChangedCallback')
        if (name === 'header-title') {
            this.shadowRoot.getElementById('js-modal-container-header-title-id').innerHTML = `<b>${this.getAttribute('header-title') ? this.getAttribute('header-title') : ''}</b>`
        }
        else if (name === 'header-actions') {
            let actionPanel = this.shadowRoot.getElementById('js-modal-container-header-actions-id')
            actionPanel.innerHTML = ''
            let actions = JSON.parse(this.getAttribute('header-actions'))
            // actions.push({
            //     src: 'icons/cross.png',
            //     alt: 'cross-icon',
            //     callback: this.closeModal.toString()
            // })
            actions.forEach(action => {
                let actionElement = this.createActionElement(action, true)
                actionPanel.appendChild(actionElement)
            });
            this.configureHeaderCloseAction();
        }
        else if (name === 'footer-actions') {
            let actionPanel = this.shadowRoot.getElementById('js-modal-container-footer-id')
            let actions = JSON.parse(this.getAttribute('footer-actions'))
            actions.forEach(action => {
                let actionElement = this.createActionElement(action, false)
                actionPanel.appendChild(actionElement);
            });
        }
        else if (name === 'close-modal') {
            this.closeModalCallback = eval(this.getAttribute('close-modal'));
        }
    }


    connectedCallback() {
        console.log('js-modal is connected!');
    }

    disconnectedCallback() {
        const actionPanel = this.shadowRoot.getElementById('js-modal-container-header-actions-id')
        actionPanel.innerHTML = ''
        console.log('js-modal is disconnected!');
    }

}

window.customElements.define('js-modal', modalClass);