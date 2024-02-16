// Storage Feature
const linkList = document.querySelector('#link-list')
let generatedLinks = [""]
window.addEventListener('load', e =>{
    e.preventDefault()
    let savedLinks = window.localStorage.getItem('generated-links')
    if (savedLinks !== null) {
        generatedLinks = JSON.parse(window.localStorage.getItem('generated-links'))
        updateLinks(generatedLinks)
    }

})


// Mobile Menu bar toggle
const menuBtn = document.querySelector('#menu-btn')
const menu = document.querySelector('#menu')

menuBtn.addEventListener( 'click', e =>{
    e.preventDefault()
    
    if (menu.classList.contains('hidden')) {
        menuBtn.setAttribute('src', './images/cross.png')
    }else{
        menuBtn.setAttribute('src', './images/menu-burger.png')
    }
    
    menu.classList.toggle('hidden')
})

// I don't know what to call this section yet
const submitBtn = document.querySelector('#submit')
const phoneNum = document.querySelector('#number')
const message = document.querySelector('#message')
const successMessage = document.querySelector('#success-message')
const errMsg = document.querySelector("#err-msg")


submitBtn.addEventListener('click', e =>{
    e.preventDefault()
    let processedMessage = message.value.replace(/ /g, '+')
    let validated = validateInputs(phoneNum.value, processedMessage)

    if (validated) {
        generateLink(phoneNum.value, processedMessage)
        setSuccess()
    } else {
        setError()
    }
    
})

function generateLink(num, text) {
    let waLink = `https://wa.me/${num}?text=${text}`
    window.navigator.clipboard.writeText(waLink)

    generatedLinks.unshift(waLink)
    
    window.localStorage.setItem('generated-links', JSON.stringify(generatedLinks))
    updateLinks(generatedLinks)
}

function validateInputs(num, text) {
    if (!isNaN(num) && text !== "") {
        return true
    }else{return false}
}

function setError() {
    errMsg.innerHTML = "Please Check Inputs"
}
function setSuccess() {
    errMsg.innerHTML = ""
    console.log('it worked')
    successMessage.setAttribute("data-visible", "true")
    setTimeout(() => {
        successMessage.setAttribute("data-visible", "false")
    }, 3000);
}
function updateLinks(linkArray) {
    linkList.innerHTML = ""
    linkArray.forEach(link =>{
        linkList.innerHTML += `<li class="text-gray-700 p-2 rounded-xl shadow-md border border-gray-200 shadow-slate-200 w-fit">${link}</li>`
    })
}