import { createCharacter, createUnlockCharacter, createCarBackground, createCarClicker, showElements, createActiveSkill, createSkillCooldown, createSkillActivated} from './dom-utils.js'
import { bolidParts, garageFacilities, driver, teamPrincipal, player, stats, game } from "./app-elements.js"

const coinsAmount = []
const coinsAmountName = ['k','m','t','aa','ab','ac','ad','ae','af','ag']

export function setWindowHeight () {
    let height = window.innerHeight;
    const bodyAnchor = document.querySelector('body')
    bodyAnchor.style.height = `${height}px`
}

export const loadObjects = function (objectsArray) {
    for(let i=0; i < objectsArray.length; i++){
        objectsArray[i].load()
        homeMenuStatsUpdate(objectsArray[i]) 
    }
}

export const createCar = function() {
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

export const verifyCoinnsAmount = function (object) {
    if(player.coins >= object.cost) {
        return true
    } 
    else {
        notEnaughtCoinsAnimation(object.type)
    }
}

export function addCoins () {
    calculateSpeed()
    const perClick = calcPerClick()

    player.coins = player.coins + perClick 
    stats.totalCoins = stats.totalCoins + perClick 
    
    statsUpDate()
    player.save()
    stats.save()
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
        createCharacter(character.type, character, upgrade)
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
            if (character === 'teamPrincipal'){
                startAutoClick()
            }
            // if (character === 'driver') {
            //     driver.value = 1.05
            // }
            object.save()
        } 
    } 
}


export const upgrade = function (object) {

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
    if(target){
    target.innerText = `${object.value}${object.actionSign}`
    }
}


// --------------------------------------------------- SKILLS
export const unlockSkill = function (character) {
    if (character.addSkill){
    createActiveSkill(character)
    }
    const skill = document.querySelector(character.skillId)

    skill.addEventListener('click',() => {
        checkSkillAvailability(character)
    })
}

const checkSkillAvailability = function (character) {

    let skillStatus = character.skillAvailability
    // console.log(skillStatus)

    if(skillStatus) {
        character.skillAvailability = false
        skillActivation(character)
    }
}


const skillActivation = function (character) {

        setDisplayElement(character)
        
        const displayCounter = document.querySelector(`#${character.type}-skill-timer`)
        let counter = character.skillDuration

        if(character.type === 'driver') {
            boostSpeed(character.skillDuration)
        }
        if(character.type === 'teamPrincipal') {
            boostAutoClick()
        }
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

const setDisplayElement = function (character) {

    const hidePreviousElement = document.querySelector(`${character.skillId} .skill-available-container`)
    hidePreviousElement.style.display = 'none'
    const requiredElement = game[`${character.type}ActivatedSkillCreated`]

        if (!requiredElement){ 
            createSkillActivated(character)
            game[`${character.type}ActivatedSkillCreated`] = true
            // console.log('req el false')
        }
        if (requiredElement) {
            const showElement = document.querySelector(`${character.skillId} .skill-activated`)
            showElement.style.display = 'flex'
            // console.log('req el true')
        }

}



const skillCooldown = function(character) {
    
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

let clickTimer
let autoClickInterval = 1000

const autoClick = function () {
    addCoins()
    clickTimer = setTimeout(autoClick, autoClickInterval)
}

const startAutoClick = (interval) => {
    autoClick(interval)
}

const stopAutoClick = () => {
    clearTimeout(clickTimer)
}

const boostAutoClick = () => {
    const duration = teamPrincipal.skillDuration * 1000

    stopAutoClick()
    autoClickInterval = 250
    startAutoClick()
    
    const stopBoost = function () {
        setTimeout(() => {
            console.log(autoClickInterval + 'stop')
            stopAutoClick()
            autoClickInterval = 1000
            startAutoClick()
            console.log(autoClickInterval + "start")
        }, duration)
    }
    console.log(duration + "boost")
    stopBoost()
}

const boostSpeed = (duration) => {
    console.log('boostSpeed')
    const time = duration * 1000
    driver.skillStatus = true
    calculateSpeed()
    speedAdjust()
    
    setTimeout( () => {
        driver.skillStatus = false
        calculateSpeed()
        speedAdjust()
        console.log('boostSpeed Set timeOut')
    }, time)

}
// const perSecStats = document.querySelector('#PS-counter-value')
export const activeStyleNavigation = function (activeNavigation) {
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


export function statsUpDate () {
    const perClickStats = document.querySelector('#PC-counter-value')
    const totalValueStats = document.querySelector('#Total-counter-value')
    stats.perClick = calcPerClick()
    numbersAdjust(player.coins, counter)
    numbersAdjust(stats.totalCoins, totalValueStats)
    numbersAdjust(stats.perClick, perClickStats)
    
    speed.innerText = `${player.speed} km/h`
} 
export function calculateSpeed () {
    let speed = 0
    let bonusSpeed = 0
    bolidParts.forEach(e => speed += e.value)

    if (driver.skillStatus) {
        bonusSpeed = speed
    } else {
        bonusSpeed = 0
    }

    player.speed = speed + bonusSpeed
    // console.log(speed)
    // console.log(bonusSpeed)
    statsUpDate()
}



function calcPerClick () {
    const sponsors = garageFacilities[0] // sponsors object
    const perClick = Math.floor(player.speed * driver.value * sponsors.value)
    stats.perClick = perClick
    return perClick
}

export function calcPerSeconds () {
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

export function checkAutoClickAvailability () {
    if(JSON.parse(localStorage.getItem('teamPrincipalBought'))){
        startAutoClick(1000)
    }
}