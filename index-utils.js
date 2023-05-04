import { numbersAdjust } from './app.js'

function addHover () {
    const hoverElements = document.querySelectorAll('.menu__button')

    hoverElements.forEach(button => {
        const text = button.innerText
        
        button.addEventListener('mouseenter', (e) => {
            const hover = e.target
            hover.innerText = `--- ${text} ---`
        }) 
        button.addEventListener('mouseleave', (e) => {
            const hover = e.target
            hover.innerText = text
        }) 
    });
}

function showGuidebook () {
    const credits = document.querySelector('.accessory__box_credits')
    credits.style.display = 'none'

    const guidebook = document.querySelector('.accessory__box_guidebook')
    guidebook.style.display = 'flex'
}

function showCredits () {
    const guidebook = document.querySelector('.accessory__box_guidebook')
    guidebook.style.display = 'none'

    const credits = document.querySelector('.accessory__box_credits')
    credits.style.display = 'flex'
}

function setAccessory () {

    const menu = document.querySelector('.menu__board')
    menu.classList.add('hide-element')
    
    setTimeout(() => {
        menu.style.display = 'none'
        menu.classList.remove('hide-element')
        showAccessory()
    }, 300)
    
    function showAccessory () {
        document.querySelector('.accessory__box').style.display = 'flex'
        backButton.style.display = 'flex'
    }
}

function setMenu  () {
    const accessory = document.querySelector('.accessory__box')
    accessory.classList.add('hide-element')
    backButton.classList.add('hide-element')

    setTimeout(() => {
        accessory.style.display = 'none'
        accessory.classList.remove('hide-element')
        backButton.classList.remove('hide-element')
        showMenu()
    }, 300)

    function showMenu () {
        document.querySelector('.menu__board').style.display = 'flex'
        backButton.style.display = 'none'
    }
}



// ___________________________ LISTENERS_______________________________

const guidebookButton = document.querySelector('#accessory__guidebook')
guidebookButton.addEventListener('click', () => {
    setAccessory()
    showGuidebook()
})

const creditsButton = document.querySelector('#accessory__credits')
creditsButton.addEventListener('click', () => {
    setAccessory()
    showCredits()
})

const backButton = document.querySelector('.accessory__box_back')
backButton.addEventListener('click', () => {
    setMenu()
})

const loadSave = document.querySelector('#load-container__save-game')
loadSave.addEventListener('click', () => {
    
})

function checkGameSave () {
    const saveName = localStorage.getItem('saveName')
    if(saveName){
        document.querySelector('#save-details__data').innerText = saveName
        const valueLabel = document.querySelector('#save-details__value')
        const saveValue = localStorage.getItem('playerCoins')*1
        numbersAdjust(saveValue,valueLabel)
}
}

addHover()
checkGameSave()

