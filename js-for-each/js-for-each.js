class forEachClass extends HTMLElement {

    constructor() {
        super()

        for( let i = 0 ;  i< 10; i++)
            this.parentElement.appendChild(this.children[0].content.cloneNode(true))

        this.parentElement.removeChild(this);

        this.style.display = 'none'
        console.log('js-for-each constructor!');
    }

    connectedCallback() {
        console.log('js-for-each is connected!');

    }

    disconnectedCallback() {
        console.log('js-for-each is disconnected!');
    }

}

window.customElements.define('js-for-each', forEachClass);