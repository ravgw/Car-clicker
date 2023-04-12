
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

function showInformationBox () {

    const menu = document.querySelector('.menu__board')
    menu.classList.add('hide-menu')
    
    setTimeout(() => {
        menu.style.display = 'none'
        menu.classList.remove('hide-menu')
        showBox()
    }, 300)

    function showBox () {
        document.querySelector('.information-box').style.display = 'flex'
    }
}

addHover()

const newGame = document.querySelector('#menu__new-game')
newGame.addEventListener('click', () => {
    console.log('new game')
})

const accessoryButton = document.querySelectorAll('.menu__accessory button')
accessoryButton.forEach( e => {
    e.addEventListener('click', () => {
        showInformationBox()
    })
})
