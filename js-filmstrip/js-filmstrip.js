const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="js-filmstrip/js-filmstrip.css">
    <div id= 'js-filmstrip-id' class='js-filmstrip'>
        <button id= 'js-filmstrip-first-arrow-id' type='button' class='js-filmstrip-left-arrow'></button>
        <div id= 'js-filmstrip-body-id' class='js-filmstrip-body display-none' >
        </div>
        <button id= 'js-filmstrip-last-arrow-id' type='button' class='js-filmstrip-right-arrow' ></button>
    </div>
    `
class filmstripClass extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.filmstripEle = this.shadowRoot.querySelector('#js-filmstrip-id')

        this.configurefilmstripBody()

        this.configurefilmstripArrows()



        console.log('js-filmstrip constructor!');
    }

    static get observedAttributes() {
        return ['direction', 'max-item-per-page', 'read-only', 'disabled']
    }



    configurefilmstripArrows() {

        this.firstArrowEle = this.shadowRoot.querySelector('#js-filmstrip-first-arrow-id')
        this.lastArrowEle = this.shadowRoot.querySelector('#js-filmstrip-last-arrow-id')

        this.firstArrowEle.addEventListener('click', () => {
            for (let i = (this.currentWindow - 1) * this.maxCountPerPage; i < Math.min(this.currentWindow*this.maxCountPerPage, this.filmstripBody.children.length); i++) {
                this.filmstripBody.children[i].classList.add('display-none')
            }
            this.currentWindow--
            console.log('first->',(this.currentWindow - 1) * this.maxCountPerPage, 'last->', this.currentWindow*this.maxCountPerPage -1 )
            for (let i = (this.currentWindow - 1) * this.maxCountPerPage; i < this.currentWindow*this.maxCountPerPage; i++) {
                this.filmstripBody.children[i].classList.remove('display-none')
            }
        })

        this.lastArrowEle.addEventListener('click', () => {
            for (let i = (this.currentWindow - 1) * this.maxCountPerPage; i < Math.min(this.currentWindow*this.maxCountPerPage, this.filmstripBody.children.length); i++) {
                this.filmstripBody.children[i].classList.add('display-none')
            }
            this.currentWindow++
            console.log('first->',(this.currentWindow - 1) * this.maxCountPerPage, 'last->', this.currentWindow*this.maxCountPerPage -1 )
            for (let i = (this.currentWindow - 1) * this.maxCountPerPage; i < Math.min(this.currentWindow*this.maxCountPerPage, this.filmstripBody.children.length); i++) {
                this.filmstripBody.children[i].classList.remove('display-none')
            }
        })
    }

    configurefilmstripBody() {
        this.filmstripBody = this.shadowRoot.querySelector('#js-filmstrip-body-id')
        this.filmstripBody.innerHTML = this.innerHTML
        for (let ele of this.filmstripBody.children) {
            ele.classList.add('display-none');
        }
        this.filmstripBody.classList.remove('display-none');
        this.currentWindow = 1
    }

    get lastWindow(){
        return Math.floor(this.filmstripBody.children.length/this.maxCountPerPage) + (this.filmstripBody.children.length%this.maxCountPerPage ? 1:0)
    }
    get currentWindow() {
        return this._currentWindow ? this._currentWindow : 1
    }
    set currentWindow(val) {
        console.log('update this : ', this.lastWindow >= val, this.lastWindow , val)
        if( val >= 1 && this.lastWindow >= val )
            this._currentWindow = val
    }

    get maxCountPerPage() {
        return parseInt(this.getAttribute('max-item-per-page'));
    }

    // set maxCountPerPage(val){
    //     /***/
    // }

    attributeChangedCallback(name) {
        if (name === 'direction' && this.getAttribute(name) === 'vertical') {
            this.filmstripEle.classList.add('js-filmstrip-vertical')
            this.firstArrowEle.classList.add('js-filmstrip-up-arrow')
            this.lastArrowEle.classList.add('js-filmstrip-down-arrow')
            this.filmstripBody.classList.add('flex-direction-col')
        }
        if (name === 'max-item-per-page') {
            for (let i = 0; i < this.filmstripBody.children.length; i++) {
                if (i < this.maxCountPerPage)
                    this.filmstripBody.children[i].classList.remove('display-none');
            }
        }
    }


    connectedCallback() {
        console.log('js-filmstrip is connected!');

    }

    disconnectedCallback() {
        console.log('js-filmstrip is disconnected!');
    }

}

window.customElements.define('js-filmstrip', filmstripClass);