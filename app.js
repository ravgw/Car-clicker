import { createCarClicker, createCarBackground, createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter, createCharacter, activeSkill, createSkillActivated } from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal } from "./app-elements.js"

createCarClicker();
createCarBackground();



const speed = document.getElementById('speed')
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
    actualCoins: 10000,
    speed: 0,
    speedBooster: 0,
    actualSpeed: 0,
    driver: false,
    driverSkill: true,
    teamPrincipal: false,
    teamPrincipalSkill: true,
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

const speedAdjust = function () {
    player.actualSpeed = player.speed + player.speedBooster
    speed.textContent = `${player.actualSpeed} km/h`
}

speedAdjust();

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
        removeAlertCssClass()
        showElements('driver')
    }


    if(bolidMenu) {
        showElements('bolid-options')
        activeStyleNavigation('menuBolid')
    } else {
        bolidMenu = true
        createCardNavigation('bolid-options', 'Driver', 'Parts')
        activeStyleNavigation('menuBolid')
    }
        const partsCard = document.getElementById('Parts-option')
        partsCard.addEventListener('click', (e) =>{


        removeAlertCssClass()
        driverCard.classList.remove('pushedKey')    
        partsCard.classList.add('pushedKey')  

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

        driverCard.classList.add('pushedKey')    
        partsCard.classList.remove('pushedKey')  

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
            activeStyleNavigation('menuGarage')
        } else {
            garageMenu = true
            createCardNavigation('garage-options','TeamPrincipal', 'Facilities' )
            activeStyleNavigation('menuGarage')
        }
        
        const facilitiesCard = document.getElementById('Facilities-option')
        facilitiesCard.addEventListener('click', (e) =>{

            removeAlertCssClass()
            TeamPrincipalCard.classList.remove('pushedKey')    
            facilitiesCard.classList.add('pushedKey')  

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

            TeamPrincipalCard.classList.add('pushedKey')    
            facilitiesCard.classList.remove('pushedKey')  


            if(garageCards) {
                hideElements('garage')
            }
            if(checkTeamPrincipal){
                removeAlertCssClass()
                showElements('teamPrincipal')
            }
        })
})

const homeElement = document.getElementById('home-navigation')
homeElement.addEventListener('click', (e) => {


    if(!homeBoard) {
        showElements('homeBoard')
        activeStyleNavigation('menuHome')
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
    const character = object.type
    if (!object.bought) {
        if(verifyCoinnsAmount(object)) {
            player[`${character}`] = 'true'
            player.spendCoins(object.cost)
            createCharacter(character, object, upgrade)
            if (character === 'teamPrincipal'){
                startAutoClick()
            }
            if (character === 'driver') {
                driver.value = 1.05
            }
        } 
    } 
}

const upgrade = function (object) {
    
    const displayCost = document.getElementById(`${object.type}-price`)
    const displayLvl = document.getElementById(`${object.type}Lvl`)


    if(verifyCoinnsAmount(object)) {
        object.upgrade()
        numbersAdjust(object.cost, displayCost)
        countMultiplierSpeed()

        player.spendCoins(object.cost)
        displayLvl.innerText = 'Lvl. ' + object.level

        if(object.addSkill) {
            unlockSkill(object)
        }

    } 

}

const verifyCoinnsAmount = function (object) {
    if(player.actualCoins >= object.cost) {
        return true
    } 
    else {
       notEnaughtCoinsAnimation(object.type)
    }
}
function notEnaughtCoinsAnimation (cardObjectname) {
    const element = document.querySelector(`#${cardObjectname}-price`)

    removeAlertCssClass()
    counter.offsetWidth;
    counter.classList.add('not-enaugh');
    element.classList.add('upgrade-price-alert');
}


const removeAlertCssClass = function () {

    const elements = document.querySelectorAll('.upgrade-price-alert')

    elements.forEach((e) => e.classList.remove('upgrade-price-alert'))
    counter.classList.remove('not-enaugh');
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

// --------------------------------------------------- SKILLS
const unlockSkill = function (character) {
    activeSkill(character)

    const skill = document.querySelector(character.skillId)
    skill.addEventListener('click',() => {
        if (character.type === 'teamPrincipal') {
            if(character.skillAvailability){
                boostAutoClick()
                activateSkill(character)
                character.skillTimer()
            }
        }
        if (character.type === 'driver') {
            if(character.skillAvailability){
                boostSpeed()
                activateSkill(character)
                character.skillTimer()
            }
        }
    })
}

const activateSkill = function (character) {
    const hide = document.querySelector(`${character.skillId} .skill-available-container`)
    console.log(hide)
    hide.style.display = 'none'

    createSkillActivated(character)

    let counter = character.skillDuration
    const displayCounter = document.querySelector(`#${character.type}-skill-timer`)
    
    const timer = function () {
        displayCounter.textContent = counter
        setTimeout( () => {
            if (counter >= 1) {
                if (counter === 4) {
                    displayCounter.classList.add('anim-skill-duration')
                }
                counter--
                displayCounter.textContent = counter
                timer()
            }
        },1000)
    }
    timer()

}

let clickTimer;
let timerOn = 0;

const autoClick = function () {
    player.autoCoins()
    clickTimer = setTimeout(autoClick, 1000)
}

const startAutoClick = () => {
    autoClick()
}

const stopAutoClick = () => {
    clearTimeout(clickTimer)
}

const boostSpeed = () => {

    // const actualSpeed = player.actualSpeed
    player.speedBooster = player.actualSpeed
    console.log('start speed')
    speedAdjust()
    setTimeout( () => {
        player.speedBooster = 0
        speedAdjust()
        console.log('stop--speed')
    },1000)
}

const boostAutoClick = () => {

    stopAutoClick()
    const boost = function (callback) {
        player.autoCoins()
        clickTimer = setTimeout(boost, 250)
    }
    const stopBoost = function () {
        setTimeout(() => {
            stopAutoClick()
            startAutoClick()
        }, 30*1000)
    }
    boost()
    stopBoost()
}
// ------------------------------------------------- END SKILLS -------------------------------------------------
const countMultiplierSpeed = function () {
    let multiplier = 0
    for ( let i = 0; i < bolidParts.length; i++){
        const x = bolidParts[i]
        multiplier = multiplier + x.value
    }
    player.speed = multiplier
    speedAdjust()
}
countMultiplierSpeed();
createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);

const totalValueStats = document.querySelector('#Total-counter-value')
totalValueStats.innerText = `${stats.totalCoins} \u2234`
const perSecStats = document.querySelector('#PS-counter-value')
perSecStats.innerText = `${stats.perSec} \u2234`
const perClickStats = document.querySelector('#PC-counter-value')
perClickStats.innerText = `${stats.perClick} \u2234`



const activeStyleNavigation = function (activeNavigation) {
    let menu = activeNavigation

    const speed = document.querySelector('#speed')
    const coins = document.querySelector('#money')
    
    const bolid = document.querySelector('#bolid-navigation')
    const homeButton = document.querySelector('#home-navigation')
    const garage = document.querySelector('#garage-navigation')
    
    const driver = document.querySelector('#Driver-option')
    const parts = document.querySelector('#Parts-option')
    const tp = document.querySelector('#TeamPrincipal-option')
    const facilities = document.querySelector('#Facilities-option')

    const elements = [speed,coins,bolid,homeButton,garage,driver,parts,tp,facilities]

    const leftUp = 'left-up'
    const leftDown = 'left-down'
    const rightUp = 'right-up'
    const rightDown = 'right-down'
    const nbr = 'nbr'

    const bolidActive = function () {
        removeStyle()
        const steps = [leftUp,rightDown,leftDown,nbr,rightUp,leftUp,rightDown,nbr,nbr]
        activate(steps, bolid)
        bolid.classList.add('pushedKey')
        driver.classList.add('pushedKey')
    }
    
    const homeActive = function () {
        removeStyle()
        const steps = [leftDown,rightDown,leftUp,nbr,rightUp,nbr,nbr,nbr,nbr]
        activate(steps, homeButton)
        homeButton.classList.add('pushedKey')
    }
    
    const garageActive = function () {
        removeStyle()
        const steps = [leftDown,rightUp,leftUp,nbr,rightDown,nbr,nbr,leftDown,rightUp]
        activate(steps, garage)
        garage.classList.add('pushedKey')
        tp.classList.add('pushedKey')
    }
    
    const activate = function (steps, button) {
        // button.classList.add('pushedKey')
        for (let i = 0; i < elements.length; i++){
            if (elements[i]){
                elements[i].classList.add(steps[i])
                // style[i] = steps[i]
            }
        }
    }
    
    const removeStyle = function () {
        for (let i = 0; i < elements.length; i++){
            if (elements[i]){
                elements[i].classList.remove('left-up')
                elements[i].classList.remove('left-down')
                elements[i].classList.remove('right-up')
                elements[i].classList.remove('right-down')
                elements[i].classList.remove('nbr')
                elements[i].classList.remove('pushedKey')
            }
        }
    }

    if (menu == 'menuBolid') {bolidActive()}
    if (menu == 'menuHome') {homeActive()}
    if (menu == 'menuGarage') {garageActive()}
}
activeStyleNavigation('menuHome')




