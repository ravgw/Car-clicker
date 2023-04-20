import { createCarClicker } from './dom-utils.js'

const carSample = document.querySelector('.car-sample')
createCarClicker(carSample)

function setNumber () {

    let onesValue = 0
    let tensValue = 0

    const onesDigit = document.querySelector('#set-number__number_ones')
    const tensDigit = document.querySelector('#set-number__number_tens')

    const upOnes = document.querySelector('#set-number__up_ones')
    upOnes.addEventListener('click', () => {
        if ( onesValue >=0 && onesValue <=8 ) {
            onesValue++
            onesDigit.innerText = onesValue 
        } else if ( onesValue === 9) {
            onesValue = 0
            onesDigit.innerText = onesValue 
        }
        displayNumber()
    })
    const downOnes = document.querySelector('#set-number__down_ones')
    downOnes.addEventListener('click', () => {
        if ( onesValue >=1 && onesValue <=9 ) {
            onesValue--
            onesDigit.innerText = onesValue 
        } else if ( onesValue === 0) {
            onesValue = 9
            onesDigit.innerText = onesValue 
        }
        displayNumber()
    })
    const upTens = document.querySelector('#set-number__up_tens')
    upTens.addEventListener('click', () => {
        if ( tensValue >=0 && tensValue <=8 ) {
            tensValue++
            tensDigit.innerText = tensValue 
        }  else if ( tensValue === 9) {
            tensValue = 0
            tensDigit.innerText = tensValue 
        }
        displayNumber()
    })
    const downTens = document.querySelector('#set-number__down_tens')
    downTens.addEventListener('click', () => {
        if ( tensValue >=1 && tensValue <=9 ) {
            tensValue--
            tensDigit.innerText = tensValue 
        }  else if ( tensValue === 0) {
            tensValue = 9
            tensDigit.innerText = tensValue 
        }
        displayNumber()
    })

    function displayNumber () {
        const number = document.querySelector('#car-number')
        const ones = onesValue.toString()
        const tens = tensValue.toString()

        if (tens === '0') {
            number.innerText = ones
        } else {
            number.innerText = tens+ones
        }
    }
    
}

function setColor () {
    const carBody = document.querySelector('#car-body__colors')
    const racingSuit = document.querySelector('#driverBody')
    const helmet = document.querySelector('#driverHelmet')

}

function addColorsPalette (container) {
    const colorsPalette = ['FF1B1C','FF7F11','6E44FF','690375','323031','FFC857','E6E6E6','FF8552','248232','2176FF','E8EBF7']
    
    for ( let i = 0; i < colorsPalette.length; i++) {
        const color = document.createElement('span')
        color.classList.add('color')
        color.title = `#${colorsPalette[i]}`
        color.style.backgroundColor = `#${colorsPalette[i]}`
        container.appendChild(color)
    }
}

function setCarBodyColor (color) {
    const carBodyFront = document.querySelector('#carBodyFront')
    const carBodyRear = document.querySelector('#carBodyRear')
    carBodyFront.style.backgroundColor = color
    carBodyRear.style.backgroundColor = color
}

// carBody.addEventListener('click', (e) => {

// })
// (function setColor () {
    
//     addColorsPalette(carBody)
//     carBody.addEventListener('click', (e) => {
//     })
// })();

setNumber()
