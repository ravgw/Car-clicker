import { createCarClicker, createCarBackground, createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter, createCharacter } from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal } from "./app-elements.js"

createCarClicker();
createCarBackground();




const counter = document.getElementById('money')
const clicker = document.getElementById('clicker')

let homeBoard = true
let bolidMenu = false;
let bolidCards = false;
let garageMenu = false;
let garageCards = false;
let checkPersonal = false 
let checkTeamPrincipal = false 


const player = {
    actualCoins: 0,
    actualSpeed: 0,
    driver: false,
    teamPrincipal: false,
    autoCoins: function () {
        const bonusSpeed = driver.value
        const tpBonus = teamPrincipal.value
        const sponsorsBonus = garageFacilities[0].value
        const perSec = (this.actualSpeed * bonusSpeed) * tpBonus + sponsorsBonus

        this.actualCoins = this.actualCoins + perSec
        numbersAdjust(player.actualCoins, counter)
        stats.totalCoins = stats.totalCoins + perSec
        numbersAdjust(stats.totalCoins, totalValueStats)
        stats.perSec = perSec
        numbersAdjust(stats.perSec, perSecStats)
    },
    addCoins: function () {
        const tpBonus = teamPrincipal.value
        const bonusSpeed = driver.value
        const perClick = ( this.actualSpeed * bonusSpeed * tpBonus)
    
        this.actualCoins = this.actualCoins + perClick 
        numbersAdjust(player.actualCoins, counter)
        stats.totalCoins = stats.totalCoins + perClick 
        numbersAdjust(stats.totalCoins, totalValueStats)
        stats.perClick = perClick
        numbersAdjust(stats.perClick, perClickStats)

    },
    spendCoins: function (cost) {
        if(this.actualCoins >= cost) {
            this.actualCoins = this.actualCoins - cost
            numbersAdjust(player.actualCoins, counter)}
    },

}

const stats = {
    totalCoins: 0,
    perSec: 0,
    perClick: 1,
}


clicker.addEventListener('click', (e) => {
    player.addCoins();
    numbersAdjust(player.actualCoins, counter)
})

const speed = function () {
    const container = document.getElementById('speed');
    container.textContent = `${player.actualSpeed} km/h`
}

speed();

const bolidElement = document.getElementById('bolid-navigation')
bolidElement.addEventListener('click', (e) => {

    if(homeBoard) {
        hideElements('homeBoard')
        homeBoard = false
    }

    if (garageMenu) {
        hideElements('garage-options')
        if (garageCards) {
            hideElements('garage')
        }
        if (checkTeamPrincipal) {
            hideElements('teamPrincipal')
        }
    }

    if(!checkPersonal) {
        createCharacterCard('driver')
        checkPersonal = true
        if(!player.driver) {
            createUnlockCharacter(driver, buyCharacter)
        }
    } else {
        showElements('driver')
    }


    if(bolidMenu) {
        document.querySelector('#navigation').style.background = 'transparent'
        showElements('bolid-options')
    } else {
        bolidMenu = true
        createCardNavigation('bolid-options', 'Driver', 'Parts')
        document.querySelector('#navigation').style.background = 'transparent'
    }
        const partsCard = document.getElementById('Parts-option')
        partsCard.addEventListener('click', (e) =>{     
            if (checkPersonal) {
                hideElements('driver')
            }
            if (bolidCards) {
                document.querySelector('#bolid').classList.remove('showMeHowToSlide')
                let animation
                const elements = document.querySelectorAll('.bolid-slider')
                if(!animation) {
                    elements.forEach((selector) => {
                        selector.style = 'animation: fadeIn .3s'})
                        animation = true
                }
                showElements('bolid')
            } else {
                bolidCards = true
                createCardElement('bolid', bolidParts, upgrade )
                slider('.bolid-cards-container-slider','.bolid-element-slider')
                document.querySelector('#bolid').classList.add('showMeHowToSlide')
            }
        })
        const driverCard = document.getElementById('Driver-option')
        driverCard.addEventListener('click', (e) => {
            if(bolidCards) {
                hideElements('bolid')
            }
            if(checkPersonal){
                showElements('driver') 
            }
        })
    }
    )
    
const garageElement = document.getElementById('garage-navigation')
garageElement.addEventListener('click', (e) => {

    if(homeBoard) {
        hideElements('homeBoard')
        homeBoard = false
    }

        if(bolidMenu) {
            hideElements('bolid-options')
            if(bolidCards) {
                hideElements('bolid')
            }
            if (checkPersonal) {
                hideElements('driver')
            }
        }

        if(!checkTeamPrincipal) {
            createCharacterCard('teamPrincipal')
            checkTeamPrincipal = true
            if(!player.teamPrincipal) {
                createUnlockCharacter(teamPrincipal, buyCharacter)
            }
        } else {
            showElements('teamPrincipal')
        }
        
        if(garageMenu) {
            showElements('garage-options')
        } else {
            garageMenu = true
            createCardNavigation('garage-options', 'Facilities' ,'TeamPrincipal')
        }
        
        const facilitiesCard = document.getElementById('Facilities-option')
        facilitiesCard.addEventListener('click', (e) =>{
            if (checkTeamPrincipal) {
                hideElements('teamPrincipal')
            }
            if(garageCards) {
                document.querySelector('#garage').classList.remove('showMeHowToSlide')
                let animation
                const elements = document.querySelectorAll('.garage-slider')
                if(!animation) {
                    elements.forEach((selector) => {
                        selector.style = 'animation: fadeIn .3s'})
                        animation = true
                }
                showElements('garage')
            } else {
                garageCards = true
                createCardElement('garage', garageFacilities, upgrade)
                slider('.garage-cards-container-slider','.garage-element-slider')
                document.querySelector('#garage').classList.add('showMeHowToSlide')
            }
        })
        const TeamPrincipalCard = document.getElementById('TeamPrincipal-option')
        TeamPrincipalCard.addEventListener('click', (e) => {
            if(garageCards) {
                hideElements('garage')
            }
            if(checkTeamPrincipal){
                showElements('teamPrincipal')
            }
        })
})

const homeElement = document.getElementById('home-navigation')
homeElement.addEventListener('click', (e) => {


    if(!homeBoard) {
        showElements('homeBoard')
        // document.querySelector('#navigation').style.background = 'var(--black)'
        homeBoard = true
    }

    if (bolidMenu) {
        hideElements('bolid-options')
        if (bolidCards) {
            hideElements('bolid')
        }
        if (checkPersonal){
            hideElements('driver')
        }
    }
    if (garageMenu) {
        hideElements('garage-options')
        if (garageCards) {
        hideElements('garage')
        }
        if(checkTeamPrincipal){
            hideElements('teamPrincipal')
        }
    }
})

const buyCharacter = function (object) {
    let character = object.type
    if (!object.bought) {
        if(player.actualCoins >= object.cost) {
            player[`${character}`] = 'true'
            player.spendCoins(object.cost)
            createCharacter(character, object, upgrade)
            if (player.teamPrincipal){
                autoClick()
            }
            if (character === 'driver') {
                driver.value = 1.05
            }
        } else {
            console.log('not enaugh money - buy character')
        }
    } 
}

const upgrade = function (object) {
    const displayCost = document.getElementById(`${object.type}-price`)
    if(verifyCoinnsAmount(object)) {
        player.spendCoins(object.cost)
        object.upgrade()
        document.getElementById(`${object.type}Lvl`).innerText = 'Lvl. ' + object.level
        numbersAdjust(object.cost, displayCost)
        countMultiplierSpeed()
    } else { 
        console.log('not enaugh money - upgrade')
    }
}

const verifyCoinnsAmount = function (object) {
    if(player.actualCoins >= object.cost) {
        return true
    }
}

const coinsAmount = []
const coinsAmountName = ['k','m','t','aa','ab','ac','ad','ae','af','ag']


const counterParam1 = function () {
    for ( let i = 1; i < 11; i++) {
        let base = 3
        const next = base * i
        coinsAmount.push(next)     
    }
}

let counterParam1Check = false
const numbersAdjust = function (toAdjust, target) {

    if (counterParam1){
        counterParam1()
        counterParam1Check = true
    }

    const coins = Math.floor(toAdjust)
    
    for (let i = 0; i <= coinsAmount.length; i++) {
        
        if 
        (coins < 10 ** coinsAmount[i]) 
        {
            target.textContent = `${coins} \u2234`
            break
        } 
        else if 
        (coins > 10 ** coinsAmount[i] && coins < 10 ** coinsAmount[i + 1]) 
        {
            const value = (coins * (10 ** -(coinsAmount[i]))).toFixed(1)
            target.textContent = `${value}${coinsAmountName[i]} \u2234`
            break
        }
    }
}

const autoClick = function () {
    setTimeout(() => {
        player.autoCoins()
        autoClick()
    }, 1000)
}

const countMultiplierSpeed = function () {
    let multiplier = 0
    for ( let i = 0; i < bolidParts.length; i++){
        const x = bolidParts[i]
        multiplier = multiplier + x.value
    }
    player.actualSpeed = multiplier
    document.getElementById('speed').innerText = `${player.actualSpeed} km/h`
}
countMultiplierSpeed();
createHomeBoard(bolidParts, garageFacilities);

const totalValueStats = document.querySelector('#Total-counter-value')
totalValueStats.innerText = `${stats.totalCoins} \u2234`
const perSecStats = document.querySelector('#PS-counter-value')
perSecStats.innerText = `${stats.perSec} \u2234`
const perClickStats = document.querySelector('#PC-counter-value')
perClickStats.innerText = `${stats.perClick} \u2234`


console.log()