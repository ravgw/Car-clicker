import { createCarClicker, createCarBackground, createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter, createCharacter, createActiveSkill, createSkillActivated, createSkillCooldown } from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal, player, stats, game } from "./app-elements.js"
import { confirmFunc } from "./new-game.js"
import { numbersAdjust } from "./app-utils.js"

const newGame = document.querySelector('#menu__new-game')
if(newGame) {
newGame.addEventListener('click', () => {
    location.assign("./creating-new-game.html")
})
}
// localStorage.clear()
const confirm = document.querySelector('#personalize__confirm')
if(confirm){
    confirm.addEventListener('click', () => {
        confirmFunc()
    })
}


const createCar = function() {
    const car = document.getElementById('clicker');
    if(!localStorage.length){
        createCarBackground();
        createCarClicker(car);
        createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);
        // activeStyleNavigation('menuHome')
        // calcPerSeconds()
        // speedAdjust()
    } else {
        // console.log(localStorage)
        createCarBackground();
        createCarClicker(car);
        const carNumber = document.querySelector('#car-number')
        const bodyFront = document.querySelector('#carBodyFront')
        const bodyRear = document.querySelector('#carBodyRear')
        const driverBody = document.querySelector('#driverBody')
        const driverHelmet = document.querySelector('#driverHelmet')
        
        const number = localStorage.getItem('bodyNumber')
        const bodyColor = localStorage.getItem('bodyColor')
        const racingSuitColor = localStorage.getItem('racingSuitColor')
        const helmetColor = localStorage.getItem('helmetColor')
        
        carNumber.innerText = number
        bodyFront.style.backgroundColor = bodyColor
        bodyRear.style.backgroundColor = bodyColor
        driverBody.style.backgroundColor = racingSuitColor
        driverHelmet.style.backgroundColor = helmetColor

        bolidParts[0].load()
        bolidParts[1].load()
        bolidParts[2].load()
        bolidParts[3].load()
        garageFacilities[0].load()
        garageFacilities[1].load()
        garageFacilities[2].load()
        player.load()   
        stats.load()   

        createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);
        activeStyleNavigation('menuHome')
        calculateSpeed()
        calcPerSeconds()
        // speedAdjust()
        // statsUpDate()
    }
}






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

// ------------------------------------------------------------------- NEW
function calculateSpeed () {
    let speed = 0
    let bonusSpeed = 0
    bolidParts.forEach(e => speed += e.value)

    if(game.driverSkillStatus) {
        bonusSpeed = player.speed
    } else {
        bonusSpeed = 0
    }

    player.speed = speed + bonusSpeed
    statsUpDate()
    // console.log(player.speed + 'PS')
}


function addCoins () {

    calculateSpeed()
    const perClick = calcPerClick()

    player.coins = player.coins + perClick 
    stats.totalCoins = stats.totalCoins + perClick 
    
    statsUpDate()
    player.save()
    stats.save()
}

function spendCoins(cost) {
    if(player.coins >= cost) {
        player.coins = player.coins - cost
        numbersAdjust(player.coins, counter)
    }
}

function calcPerClick () {
    const sponsors = garageFacilities[0] // sponsors object
    const perClick = player.speed * driver.value * sponsors.value
    stats.perClick = perClick
    return perClick
}

function calcPerSeconds () {

    const display = document.querySelector('#PS-counter-value')
    // console.log(display)

    let param1 = player.coins
    let param2

    const timer = function () { setTimeout( ()=> {
        param2 = player.coins
        calc()
        calcPerSeconds()
    }, 1000) }

    function calc () {
        const value = param2 - param1
        if (value > 0) {
            numbersAdjust(value,display)
        } else {
            display.innerText = `0\u2234`
        }
    }
    timer()
}


// -----------------------------------------------------------------------------------------------------------------


// const OLDstats = {
//     totalCoins: 0,
//     perSec: 0,
//     perClick: 1,
// }
if(clicker){
clicker.addEventListener('click', (e) => {
    // console.log('LISTENER')

    addCoins();
    numbersAdjust(player.coins, counter)
})
}

const speedAdjust = function () {
    // Splayer.actualSpeed = Splayer.speed + Splayer.speedBooster
    speed.textContent = `${player.speed} km/h`
}



const bolidElement = document.getElementById('bolid-navigation')
if(bolidElement){
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
        if(!player.driverOwned) {
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
}

const garageElement = document.getElementById('garage-navigation')
if(garageElement){
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
            if(!player.teamPrincipalOwned) {
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
}

const homeElement = document.getElementById('home-navigation')
if(homeElement){
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
}

const buyCharacter = function (object) {
    const character = object.type
    if (!object.bought) {
        if(verifyCoinnsAmount(object)) {
            player[`${character}Owned`] = 'true'
            spendCoins(object.cost)
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
        spendCoins(object.cost)
        object.upgrade()
        numbersAdjust(object.cost, displayCost)
        // countMultiplierSpeed()
        
        displayLvl.innerText = 'Lvl. ' + object.level
        // updateHomeStats(object)
        
        if(object.addSkill) { /// TO REBUILD    
            unlockSkill(object)
        }
        
    } 
    
    calculateSpeed();
    statsUpDate();
}

const verifyCoinnsAmount = function (object) {
    if(player.coins >= object.cost) {
        return true
    } 
    else {
        notEnaughtCoinsAnimation(object.type)
    }
}
function notEnaughtCoinsAnimation (cardObjectname) {
    const element = document.querySelector(`#${cardObjectname}-price`) || document.querySelector(`#${cardObjectname}-unlock-price`)
    
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

// --------------------------------------------------- SKILLS
const unlockSkill = function (character) {
    createActiveSkill(character)
    const skill = document.querySelector(character.skillId)
    skill.addEventListener('click',() => {
        if (character.type === 'teamPrincipal') {
            if(character.skillAvailability){
                boostAutoClick(character.skillDuration)
                activateSkill(character)
                // character.skillTimer()
            }
        }
        if (character.type === 'driver') {
            if(character.skillAvailability){
                boostSpeed(character.skillDuration)
                activateSkill(character)
                // character.skillTimer()
            }
        }
    })
}


const activateSkill = function (character) {

    const status = game[`${character.type}SkillStatus`]
    
    const skillActivation = function () {
        const hidePreviousElement = document.querySelector(`${character.skillId} .skill-available-container`)
        hidePreviousElement.style.display = 'none'
        const requiredElement = game[`${character.type}ActivatedSkillCreated`]

            if (!requiredElement){ 
                createSkillActivated(character)
                game[`${character.type}ActivatedSkillCreated`] = true
            }
            if (requiredElement) {
                const showElement = document.querySelector(`${character.skillId} .skill-activated`)
                showElement.style.display = 'flex'
            }
        
        const displayCounter = document.querySelector(`#${character.type}-skill-timer`)
        let counter = character.skillDuration
        
        const skillTimer = function () {
            displayCounter.innerText = counter
            
            setTimeout( () => {
                if ( counter === 0 ) 
                {
                    skillCooldown(character)
                    game[`${character.type}SkillStatus`] = 'available'
                    displayCounter.classList.remove('anim-skill-duration')
                } 
                else if (counter >= 1) 
                {
                    if (counter === 4) 
                    {
                        displayCounter.classList.add('anim-skill-duration')
                    }
                    counter--
                    displayCounter.innerText = counter
                    skillTimer()
                }
            },1000)
        }
        skillTimer()
    }

    if(!status) {
        game[`${character.type}SkillStatus`] = 'activated'
        skillActivation()
        } else { 
            switch(status) {
                case 'activated':
                    console.log('act')
                    break
                case 'available':
                    skillActivation()
                    game[`${character.type}SkillStatus`] = 'activated'
                    break
                default:
                    console.log('activeSkill switch default')
            }
        }
    
        console.log('function')
    
}

const skillCooldown = function (character) {
    
    
    document.querySelector(`${character.skillId} .skill-activated`).style.display = 'none'


    if (game[`${character.type}CooldownSkillCreated`]) {
        const show = document.querySelector(`${character.skillId} .skill-cooldown`)
        show.style.display = 'flex'
    }
    if (!game[`${character.type}CooldownSkillCreated`]){ 
        createSkillCooldown(character)
        game[`${character.type}CooldownSkillCreated`] = true
    }
    
    
    const displayCounter = document.querySelector(`#${character.type}-cooldown-timer`)

    let time = character.skillCooldown

    displayCounter.innerText = time + 'm'

    const openSkillUp = function () {
        const show = document.querySelector(`${character.skillId} .skill-available-container`)
        const hide = document.querySelector(`${character.skillId} .skill-cooldown`)
        console.log('openskillup')
        hide.style.display = 'none'
        show.style.display = 'flex'
    }

    character.skillTimer(openSkillUp)
    
}

let clickTimer;
let timerOn = 0;

const autoClick = function () {
    addCoins()
    clickTimer = setTimeout(autoClick, 1000)
}

const startAutoClick = () => {
    autoClick()
}

const stopAutoClick = () => {
    clearTimeout(clickTimer)
}

const boostAutoClick = (duration) => {

    const time = duration * 1000

    stopAutoClick()
    const boost = function (callback) {
        player.autoCoins()
        clickTimer = setTimeout(boost, 250)
    }
    const stopBoost = function () {
        setTimeout(() => {
            stopAutoClick()
            startAutoClick()
        }, time)
    }
    boost()
    stopBoost()
    // updateHomeStats()
}

const boostSpeed = (duration) => {

    const time = duration * 1000
    game.driverSkillStatus = true
    calculateSpeed()
    speedAdjust()
    
    setTimeout( () => {
        game.driverSkillStatus = false
        calculateSpeed()
        speedAdjust()
        console.log('boostSpeed Set timeOut')
    }, time)

}


// ------------------------------------------------- END SKILLS -------------------------------------------------
// const countMultiplierSpeed = function () {
//     let multiplier = 0
//     for ( let i = 0; i < bolidParts.length; i++){
//         const x = bolidParts[i]
//         multiplier = multiplier + x.value
//     }
//     player.speed = multiplier
//     speedAdjust()
// }
// countMultiplierSpeed();


// totalValueStats.innerText = `${stats.totalCoins} \u2234`
const perSecStats = document.querySelector('#PS-counter-value')
// perSecStats.innerText = `0\u2234`
// perClickStats.innerText = `${stats.perClick} \u2234`

// const updateHomeStats = function (object) {
    //     const element = document.querySelector(`#${object.type}-card-OLDstats-value`)
    //     if (element) {
        //         element.innerText = `${object.value}${object.actionSign}` 
        //     }
        //     OLDstats.update()
        // }
        
        
        
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


function statsUpDate () {
    const perClickStats = document.querySelector('#PC-counter-value')
    const totalValueStats = document.querySelector('#Total-counter-value')
    stats.perClick = calcPerClick()
    // console.log('2')
    numbersAdjust(player.coins, counter)
    // console.log(stats.totalCoins + 'embebe')
    numbersAdjust(stats.totalCoins, totalValueStats)
    numbersAdjust(stats.perClick, perClickStats)
    
    speed.innerText = `${player.speed} km/h`
    
} 

export const startNewGame = function() {
    createCar()
}
if(speed) {
    // console.log('sssss')
    startNewGame()
}



