import { player } from './app-elements.js'
import { createCharacter, createUnlockCharacter} from './dom-utils.js'
import { upgrade } from './app.js'

const coinsAmount = []
const coinsAmountName = ['k','m','t','aa','ab','ac','ad','ae','af','ag']

export function setWindowHeight () {
    let height = window.innerHeight;
    const bodyAnchor = document.querySelector('body')
    bodyAnchor.style.height = `${height}px`
    console.log('XD')
}

export const verifyCoinnsAmount = function (object) {
    if(player.coins >= object.cost) {
        return true
    } 
    else {
        notEnaughtCoinsAnimation(object.type)
    }
}

export function spendCoins(cost) {
    if(player.coins >= cost) {
        player.coins = player.coins - cost
        numbersAdjust(player.coins, counter)
    }
}
const counter = document.getElementById('money')
function notEnaughtCoinsAnimation (cardObjectName) {
    const element = document.querySelector(`#${cardObjectName}-price`) || document.querySelector(`#${cardObjectName}-unlock-price`)
    
    removeAlertCssClass()
    counter.offsetWidth;
    counter.classList.add('not-enaugh');
    element.classList.add('upgrade-price-alert');
}


export const removeAlertCssClass = function () {
    const elements = document.querySelectorAll('.upgrade-price-alert')

    elements.forEach((e) => e.classList.remove('upgrade-price-alert'))
    counter.classList.remove('not-enaugh');
}

const counterParam1 = function () {
    for ( let i = 1; i < 11; i++) {
        let base = 3
        const next = base * i
        coinsAmount.push(next)     
    }
}

let counterParam1Check = false
export const numbersAdjust = function (toAdjust, target) {
    if (!counterParam1Check){
        counterParam1()
        counterParam1Check = true
    }

    const coins = Math.floor(toAdjust)
    for (let i = 0; i <= coinsAmount.length; i++) {
        if 
        (coins < 10 ** coinsAmount[i]) 
        {
            target.innerText = `${coins} \u2234`
            break
        } 
        else if (coins > 10 ** coinsAmount[i] && coins < 10 ** coinsAmount[i + 1]){
            const value = (coins * (10 ** -(coinsAmount[i]))).toFixed(1)
            target.innerText = `${value}${coinsAmountName[i]} \u2234`
            break
        }
    }
}

export const checkSaveStatus = function (storageItem) {
    if(localStorage.getItem(storageItem)){
        return true
    } else {
        return false
    }
}

export const showCharacter = function (character) {
removeAlertCssClass()
showElements(character)
}

export const setCharacterCard = function(character) {

    if(!character.bought) {
        createUnlockCharacter(character, buyCharacter)
    } else {
        createCharacter(driver.type, driver, upgrade)
        console.log('3')
        // showElements('driver')
    }
}

const buyCharacter = function (object) {
    const character = object.type
    if (!object.bought) {
        if(verifyCoinnsAmount(object)) {
            object.bought = 'true'
            // console.log('buy character log:')
            // console.log(object.bought)
            spendCoins(object.cost)
            createCharacter(character, object, upgrade)
            // if (character === 'teamPrincipal'){
            //     startAutoClick()
            // }
            // if (character === 'driver') {
            //     driver.value = 1.05
            // }
        } 
    } 
}

