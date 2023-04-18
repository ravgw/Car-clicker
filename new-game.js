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
    })
    
}

setNumber()