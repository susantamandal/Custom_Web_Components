import '../js-modal/js-modal.js'

const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="js-lov/js-lov.css">
    <div class='js-lov'>
        <input id="js-lov-input-id" class="js-lov-input" type="text"/>
        <button id="js-lov-btn-id" type="button"/>
    </div>
    <js-modal id='js-lov-modal-id'></js-modal>
    `


class lovClass extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.configureModalWindow()
        this.configureInputEle()
        this.configureSearchBtn()
        console.log('js-lov constructor!');
    }

    static get observedAttributes() {
        return ['lov-title', 'value', 'read-only', 'disabled']
    }


    configureModalWindow(){
        this.modalEle = this.shadowRoot.querySelector('#js-lov-modal-id')
        this.modalEle.setAttribute('header-title', 'Title')
    }

    configureInputEle(){
        this.inputEle = this.shadowRoot.querySelector('#js-lov-input-id')
    }

    configureSearchBtn(){
        this.searchBtn = this.shadowRoot.querySelector('#js-lov-btn-id')
        this.searchBtn.addEventListener('click', () => {
            this.modalEle.openModal();
        })
    }

    attributeChangedCallback(name) {
        if( name === 'lov-title' ){
            this.modalEle.setAttribute('header-title', this.getAttribute(name) ? this.getAttribute(name): "Title")
        }
        else if( name === 'value' ){
            this.inputEle.setAttribute('value', this.getAttribute(name))
        }
        else if( name === 'read-only' && (this.getAttribute(name) === true || this.getAttribute(name) === 'true') ){
            this.searchBtn.classList.add("js-lov-display-none");
            this.inputEle.setAttribute('readonly', true)
            this.inputEle.classList.add("js-lov-right-radius");

        }
        else if ( name === 'disabled' && (this.getAttribute(name) === true || this.getAttribute(name) === 'true' )){
            this.searchBtn.setAttribute('disabled', true )
            this.searchBtn.parentNode.classList.add("js-lov-disabled");
        }
    }


    connectedCallback() {
        console.log('js-lov is connected!');

    }

    disconnectedCallback() {
        console.log('js-lov is disconnected!');
    }

}

window.customElements.define('js-lov', lovClass);