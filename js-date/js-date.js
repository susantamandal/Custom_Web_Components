const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="js-date/js-date.css">
    <div class='js-date'>
        <input id="js-date-input-id" class="js-date-input" type="text"/>
        <table>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>January</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>February</td>
                    <td>$80</td>
                </tr>
            </tbody>
        </table>
    </div>
    `
class dateClass extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        console.log('js-date constructor!');
    }

    static get observedAttributes() {
        return ['date-title', 'value', 'read-only', 'disabled']
    }



    attributeChangedCallback(name) {

    }


    connectedCallback() {
        console.log('js-date is connected!');

    }

    disconnectedCallback() {
        console.log('js-date is disconnected!');
    }

}

window.customElements.define('js-date', dateClass);