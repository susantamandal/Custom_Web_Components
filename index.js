import './js-switch/js-switch.js'
import './js-modal/js-modal.js'
import './js-lov/js-lov.js'
import './js-filmstrip/js-filmstrip.js'
import './js-for-each/js-for-each.js'


function openModal () {
    modalEle.openModal();
}

const closeModal = () => {
    console.log('Close call back invoked');
}


const headerActions = [
    {
        src: 'icons/search.png',
        alt: 'search-icon',
        callback: (() =>{
            alert('Search callback')
        }).toString()
    }
]

const footerActions = [
    {
        label : "Submit",
        callback: (() => {
            alert("Submit")

        }).toString()
    },
    {
        label : "Close",
        callback: (() => {
            alert("Close")
            modalEle.closeModal();
        }).toString()
    }
]

const indexBtn = document.querySelector('#index-btn')
indexBtn.addEventListener('click', openModal)


const modalEle = document.getElementById('modal-element-id')
modalEle.setAttribute('header-actions', JSON.stringify(headerActions))
modalEle.setAttribute('footer-actions', JSON.stringify(footerActions))
modalEle.setAttribute('close-modal', closeModal)