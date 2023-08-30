const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="js-switch/js-switch.css">
    <div id="js-switch-id" class="js-switch">
        <div id="js-switch-circle-id" class="js-switch-circle"></div>
    </div>
    `


class switchClass extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.switch = this.shadowRoot.querySelector('#js-switch-id')
        this.circle = this.shadowRoot.querySelector('#js-switch-circle-id')

        this.value = false
        this.disabled = false

        console.log('js-switch constructor!');
    }

    static get observedAttributes() {
        return ['value', 'disabled']
    }

    get value() {
        return ( this.getAttribute('value') === 'true' || this.getAttribute('value') === true )
    }

    set value(val) {

        if (val) {
            this.circle.classList.remove('move-right-to-left')
            this.circle.classList.add('move-left-to-right')
            this.switch.classList.remove('change-to-grey')
            this.switch.classList.add('change-to-blue')

        }
        else {

            this.circle.classList.remove('move-left-to-right')
            this.circle.classList.add('move-right-to-left')
            this.switch.classList.remove('change-to-blue')
            this.switch.classList.add('change-to-grey')
        }

    }

    get disabled() {
        return (this.getAttribute('disabled') === "" || this.getAttribute('disabled') === 'true' || this.getAttribute('disabled') === true )
    }


    set disabled(val) {

        if (val) {
            this.switch.style.opacity = '0.3'
            this.switch.removeEventListener('click', this.toggleSwitch)
        }
        else {

            this.switch.style.opacity = '1'
            this.switch.addEventListener('click', this.toggleSwitch)
        }
    }

    // setActiveClasses = () => {

    //     if (this.value) {
    //         this.circle.classList.remove('move-right-to-left')
    //         this.circle.classList.add('move-left-to-right')
    //         this.switch.classList.remove('change-to-grey')
    //         this.switch.classList.add('change-to-blue')
    //     }
    //     else {
    //         this.circle.classList.remove('move-left-to-right')
    //         this.circle.classList.add('move-right-to-left')
    //         this.switch.classList.remove('change-to-blue')
    //         this.switch.classList.add('change-to-grey')
    //     }
    // }

    // setDisabledClass = () => {
    //     if (this.disabled){
    //         this.switch.style.opacity = '0.3'
    //         this.circle.removeEventListener('click')
    //     }
    //     else {

    //         this.switch.style.opacity = '1'
    //         this.switch.addEventListener('click', this.toggleSwitch)
    //     }
    // }

    attributeChangedCallback(name) {

        if (name === 'value') {
            this.value = (this.getAttribute(name) === 'true' || this.getAttribute(name) === true)
        }
        else if (name === 'disabled') {
            this.disabled = (this.getAttribute(name) === "" || this.getAttribute(name) === 'true' || this.getAttribute(name) === true)
        }

    }

    toggleSwitch = () => {
        this.setAttribute('value', !this.value)
    }

    connectedCallback() {
        console.log('js-switch is connected!');

    }

    disconnectedCallback() {
        this.circle.removeEventListener('click')
        console.log('js-switch is disconnected!');
    }

}

window.customElements.define('js-switch', switchClass);