import { createCarClicker } from './dom-utils.js'

const carSample = document.querySelector('.car-sample')
createCarClicker(carSample)

let onesDigitDisplay = 0
let tensDigitDisplay = 0
const onesDigit = document.querySelector('#set-number__number_ones')
const tensDigit = document.querySelector('#set-number__number_tens')

function setNumber () {

    let onesValue = onesDigitDisplay
    let tensValue = tensDigitDisplay

    const upOnes = document.querySelector('#set-number__up_ones')
    upOnes.addEventListener('click', () => {
        if ( onesValue >=0 && onesValue <=8 ) {
            onesValue++
            displayNumber(onesValue,tensValue)
            // onesDigit.innerText = onesValue 
        } else if ( onesValue === 9) {
            onesValue = 0
            // onesDigit.innerText = onesValue 
            displayNumber(onesValue,tensValue)
        }
        // displayNumber(onesValue,tensValue)
    })
    const downOnes = document.querySelector('#set-number__down_ones')
    downOnes.addEventListener('click', () => {
        if ( onesValue >=1 && onesValue <=9 ) {
            onesValue--
            displayNumber(onesValue,tensValue)
            // onesDigit.innerText = onesValue 
        } else if ( onesValue === 0) {
            onesValue = 9
            displayNumber(onesValue,tensValue)
            // onesDigit.innerText = onesValue 
        }
        // displayNumber(onesValue,tensValue)
    })
    const upTens = document.querySelector('#set-number__up_tens')
    upTens.addEventListener('click', () => {
        if ( tensValue >=0 && tensValue <=8 ) {
            tensValue++
            displayNumber(onesValue,tensValue)
            // tensDigit.innerText = tensValue 
        }  else if ( tensValue === 9) {
            tensValue = 0
            // tensDigit.innerText = tensValue 
            displayNumber(onesValue,tensValue)
        }
        // displayNumber(onesValue,tensValue)
    })
    const downTens = document.querySelector('#set-number__down_tens')
    downTens.addEventListener('click', () => {
        if ( tensValue >=1 && tensValue <=9 ) {
            tensValue--
            displayNumber(onesValue,tensValue)
            // tensDigit.innerText = tensValue 
        }  else if ( tensValue === 0) {
            tensValue = 9
            displayNumber(onesValue,tensValue)
            // tensDigit.innerText = tensValue 
        }
        // displayNumber(onesValue,tensValue)
    })

    
    onesDigitDisplay = onesValue
    tensDigitDisplay = tensValue
    
}

function displayNumber (ones,tens) {
    const number = document.querySelector('#car-number')

    onesDigit.innerText = ones
    tensDigit.innerText = tens

    if (tens === 0) {
        number.innerText = ones.toString()
    } else {
        number.innerText = tens.toString() + ones.toString()
    }
}

const randomizeButton = document.querySelector('#personalize__randomize_button')
randomizeButton.addEventListener('click', () => {
    randomize()
})

function randomize () {

    const elements = [
        document.querySelector('#carBodyFront'),
        document.querySelector('#driverBody'),
        document.querySelector('#driverHelmet')
    ]

    for (let i = 0; i < elements.length; i++){
        const random = (() => {return Math.round(Math.random() * colors.length);})();
        let color = `#${colors[random]}`
        setColor(color, elements[i])
        
        // setting correct color to whole car body
        if ( i === 0) {
            const carBodyRear = document.querySelector('#carBodyRear')
            setColor(color, carBodyRear)
        }
    }

    function numbers () {

        const randomizeOnes = (() => {return Math.floor(Math.random() * 10)})();
        const randomizeTens = (() => {return Math.floor(Math.random() * 10)})();
        
        onesDigitDisplay = randomizeOnes
        tensDigitDisplay = randomizeTens

        onesDigit.innerText = onesDigitDisplay
        tensDigit.innerText = tensDigitDisplay

        displayNumber(randomizeOnes,randomizeTens)

    }
    numbers()
}
    
const colors = ['FF1B1C','FF7F11','6E44FF','690375','323031','FFC857','E6E6E6','FF8552','248232','2176FF','E8EBF7'];

(function addColorsPalette () {
    const colorsPalette = colors
    const containers = document.querySelectorAll('.personalize__color-picker')
    containers.forEach((container) => {
        addPalette(container)
    })


    function addPalette (container) {
    for ( let i = 0; i < colorsPalette.length; i++) {
        const color = document.createElement('span')
        color.classList.add('color')
        color.title = `#${colorsPalette[i]}`
        color.style.backgroundColor = `#${colorsPalette[i]}`
        container.appendChild(color)
    }}
})();


(function settingCarBodyColor () {
    const colorPalette = (document.querySelector('#car-body__colors')).querySelectorAll('span')
    const carBodyFront = document.querySelector('#carBodyFront')
    const carBodyRear = document.querySelector('#carBodyRear')

    colorPalette.forEach((color) => {
        color.addEventListener('click', () => {
            setColor(color, carBodyFront)
            setColor(color, carBodyRear)
        })
    })
})();

(function settingRacingSuitColor () {
    const colorPalette = (document.querySelector('#racing-suit__colors')).querySelectorAll('span')
    const racingSuit = document.querySelector('#driverBody')
    const helmet = document.querySelector('#driverHelmet')

    colorPalette.forEach((color) => {
        color.addEventListener('click', () => {
            setColor(color, racingSuit)
        })
    })
})();

(function settingHelmetColor () {
    const colorPalette = (document.querySelector('#driver-helmet__colors')).querySelectorAll('span')
    const helmet = document.querySelector('#driverHelmet')

    colorPalette.forEach((color) => {
        color.addEventListener('click', () => {
            setColor(color, helmet)
        })
    })
})();

function setColor (color, part) {

    let paint = color.title || color 
    part.style.backgroundColor = paint
}

setNumber()
