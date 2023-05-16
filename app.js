import { createCarClicker, createCarBackground, createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter, createCharacter, createActiveSkill, createSkillActivated, createSkillCooldown } from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal, player, stats, game } from "./app-elements.js"
import { checkSaveStatus, numbersAdjust } from "./app-utils.js"

function setWindowHeight () {
    let height = window.innerHeight;
    const bodyAnchor = document.querySelector('body')
    bodyAnchor.style.height = `${height}px`
}
setWindowHeight()
window.addEventListener('resize',() => {
    setWindowHeight()
})

function startGame() {
    if (checkSaveStatus('saveExist')){
        createCar()
        createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);
        activeStyleNavigation('menuHome')
        calculateSpeed()
        calcPerSeconds()
        
        if(checkSaveStatus('statsTotalCoins')){
        loadObjects(bolidParts)
        loadObjects(garageFacilities)
        player.load()
        stats.load()
        statsUpDate()
        }
    } else {
        createCar()
        createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);
        activeStyleNavigation('menuHome')
    }
}

const loadObjects = function (objectsArray) {
    for(let i=0; i < objectsArray.length; i++){
        objectsArray[i].load()
        homeMenuStatsUpdate(objectsArray[i]) 
    }
}

const createCar = function() {
    const car = document.getElementById('clicker');

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
let clickTimer;
// let timerOn = 0;

if(clicker){
    clicker.addEventListener('click', (e) => {
        addCoins();
        numbersAdjust(player.coins, counter)
        e.preventDefault()
        // console.log(e)
    })
}

function calculateSpeed () {
    let speed = 0
    let bonusSpeed = 0
    bolidParts.forEach(e => speed += e.value)

    if (game.driverSkillStatus) {
        bonusSpeed = player.speed
    } else {
        bonusSpeed = 0
    }

    player.speed = speed + bonusSpeed
    statsUpDate()
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

const speedAdjust = function () {
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
        displayLvl.innerText = 'Lvl. ' + object.level

        if(object.addSkill) {
            unlockSkill(object)
        }
        
        homeMenuStatsUpdate(object)
    } 
    calculateSpeed();
    statsUpDate();
}
const homeMenuStatsUpdate = function (object) {
    const target = document.querySelector(`#${object.type}-card-stats-value`)
    target.innerText = `${object.value}${object.actionSign}`
    console.log('xD')
}

const verifyCoinnsAmount = function (object) {
    if(player.coins >= object.cost) {
        return true
    } 
    else {
        notEnaughtCoinsAnimation(object.type)
    }
}
function notEnaughtCoinsAnimation (cardObjectName) {
    const element = document.querySelector(`#${cardObjectName}-price`) || document.querySelector(`#${cardObjectName}-unlock-price`)
    
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
            }
        }
        if (character.type === 'driver') {
            if(character.skillAvailability){
                boostSpeed(character.skillDuration)
                activateSkill(character)
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
                if (counter === 0){
                    skillCooldown(character)
                    game[`${character.type}SkillStatus`] = 'available'
                    displayCounter.classList.remove('anim-skill-duration')
                } else if (counter >= 1){
                    if (counter === 4){
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
}

const skillCooldown = function (character) {
    
    document.querySelector(`${character.skillId} .skill-activated`).style.display = 'none'

    if (game[`${character.type}CooldownSkillCreated`]){
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
// const perSecStats = document.querySelector('#PS-counter-value')
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
        for (let i = 0; i < elements.length; i++){
            if (elements[i]){
                elements[i].classList.add(steps[i])
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
    numbersAdjust(player.coins, counter)
    numbersAdjust(stats.totalCoins, totalValueStats)
    numbersAdjust(stats.perClick, perClickStats)
    
    speed.innerText = `${player.speed} km/h`
} 

startGame()
