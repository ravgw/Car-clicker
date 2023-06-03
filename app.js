import { createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter} from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal, player, stats } from "./app-elements.js"
import { checkSaveStatus, numbersAdjust, setWindowHeight, setCharacterCard, showCharacter, removeAlertCssClass, loadObjects, createCar, activeStyleNavigation, calcPerSeconds, calculateSpeed, upgrade, addCoins, statsUpDate, unlockSkill, checkAutoClickAvailability, characterMaxLevelStyle} from "./app-utils.js"



function startGame () {
    setWindowHeight()
    window.addEventListener('resize',() => {
        setWindowHeight()
    })

    if (checkSaveStatus('saveExist')){
        loadSaveGame()
    } else {
        startNewGame()
    }
}

function loadSaveGame () {
    function setSkills () {
        if(JSON.parse(localStorage.getItem('teamPrincipalAddSkill'))){
            // console.log(typeof(checkTpSkill))
            unlockSkill(teamPrincipal)
        }
        if(JSON.parse(localStorage.getItem('driverAddSkill'))){
            // console.log(typeof(checkDriverSkill))
            unlockSkill(driver)
        }
    }
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
        driver.load()
        teamPrincipal.load()
        statsUpDate()
        calculateSpeed()
        setSkills()
        checkAutoClickAvailability()
        }
}

function startNewGame () {
    createCar()
    createHomeBoard(bolidParts, garageFacilities,driver,teamPrincipal);
    activeStyleNavigation('menuHome')
}




const speed = document.getElementById('speed')
const counter = document.getElementById('money')
const clicker = document.getElementById('clicker')

const gameElementsStatus = {
    // homeBoard: true,
    // bolidMenu: false,
    // bolidCards: false,
    // garageMenu: false,
    // garageCards: false,
    // checkDriverCard: false, 
    driverOwned: driver.bought,
    // checkTeamPrincipal: false, 
}
let homeBoard = true

if(clicker){
    clicker.addEventListener('click', (e) => {
        addCoins();
        numbersAdjust(player.coins, counter)
        e.preventDefault()
    })
}

const bolidElement = document.getElementById('bolid-navigation')
let bolidMenu = false
let bolidCards = false
let checkDriverCard = false 
if(bolidElement){
    bolidElement.addEventListener('click', (e) => {
        // FIRST USE -> CREATE (IN CREATE, FUNCTION IS OVERRIDING TO SHOW AND SET CREATED ELEMENTS)
        hideGarageElements()
        createBolidNavigation()
    })
}

const setPartsCards = function() {
    removeAlertCssClass()
    document.getElementById('Driver-option').classList.remove('pushedKey')    
    document.getElementById('Parts-option').classList.add('pushedKey')  
    
    if (checkDriverCard) {
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
    bolidNavigationLastElement = setPartsCards
}

const setDriverCard = function(){
    document.getElementById('Driver-option').classList.add('pushedKey')    
    document.getElementById('Parts-option').classList.remove('pushedKey')  

        if(bolidCards) {
            hideElements('bolid')
        }
        if(checkDriverCard){
            showElements('driver') 
        }
    bolidNavigationLastElement = setDriverCard
}
    
let bolidNavigationLastElement = setDriverCard

let createBolidNavigation = function() {

    createCardNavigation('bolid-options', 'Driver', 'Parts')
    bolidMenu = true
    activeStyleNavigation('menuBolid')
    createCharacterCard('driver')
    checkDriverCard = true
    setCharacterCard(driver)
    if(JSON.parse(localStorage.getItem('driverMaxLevel'))){
        characterMaxLevelStyle(driver)
    }

    const partsCard = document.getElementById('Parts-option')
    partsCard.addEventListener('click', (e) =>{
       setPartsCards()
    })
    
    const driverCard = document.getElementById('Driver-option')
    driverCard.addEventListener('click', (e) => {
        setDriverCard()
    })
    
    setBolidNavigation('per per')

    // OVERRIDING FUNCTION - FROM CREATE TO SHOWING / SETTING
    createBolidNavigation = setBolidNavigation
}
                


const setBolidNavigation = function() {
    hideGarageElements()
    showElements('bolid-options') 
    activeStyleNavigation('menuBolid')
    bolidNavigationLastElement()
}

const hideGarageElements = function() {
    if(homeBoard) {
        hideElements('homeBoard')
        homeBoard = false
    }
    if (garageMenu) {
        hideElements('garage-options')
        if (garageCards) {
            hideElements('garage')
        }
        if (checkTeamPrincipalCard) {
            hideElements('teamPrincipal')
        }
    }
}

const garageElement = document.getElementById('garage-navigation')
let garageMenu = false
let garageCards = false
let checkTeamPrincipalCard = false
if(garageElement){
    garageElement.addEventListener('click', (e) => {
        // FIRST USE -> CREATE (IN CREATE, FUNCTION IS OVERRIDING TO SHOW AND SET CREATED ELEMENTS)
        hideBolidElements()
        createGarageNavigation()
    })
}

const setFacilitiesCards = function() {
    removeAlertCssClass()
    document.getElementById('TeamPrincipal-option').classList.remove('pushedKey')    
    document.getElementById('Facilities-option').classList.add('pushedKey')  

        if (checkTeamPrincipalCard) {
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
        garageNavigationLastElement = setFacilitiesCards
    }
    
    const setTeamPrincipalCard = function() {
        document.getElementById('TeamPrincipal-option').classList.add('pushedKey')    
        document.getElementById('Facilities-option').classList.remove('pushedKey')  
        
        if(garageCards) {
            hideElements('garage')
        }
        if(checkTeamPrincipalCard){
            removeAlertCssClass()
            showElements('teamPrincipal')
        }
        garageNavigationLastElement = setTeamPrincipalCard
}

let garageNavigationLastElement

let createGarageNavigation = function() {

    createCardNavigation('garage-options','TeamPrincipal', 'Facilities' )
    garageMenu = true
    activeStyleNavigation('menuGarage')
    createCharacterCard('teamPrincipal')
    checkTeamPrincipalCard = true
    setCharacterCard(teamPrincipal)
    if(JSON.parse(localStorage.getItem('teamPrincipalMaxLevel'))){
        characterMaxLevelStyle(teamPrincipal)
    }

    const facilitiesCard = document.getElementById('Facilities-option')
    facilitiesCard.addEventListener('click', (e) =>{
        setFacilitiesCards()
    })

    const TeamPrincipalCard = document.getElementById('TeamPrincipal-option')
    TeamPrincipalCard.addEventListener('click', (e) => {
        setTeamPrincipalCard()
    })

        // OVERRIDING FUNCTION - FROM CREATE TO SHOWING / SETTING
        createGarageNavigation = setGarageNavigation
}

const setGarageNavigation = function() {
    hideBolidElements()
    showElements('garage-options')
    activeStyleNavigation('menuGarage')
    garageNavigationLastElement()
}

const hideBolidElements = function() {
    if(homeBoard) {
        hideElements('homeBoard')
        homeBoard = false
    }

    if(bolidMenu) {
        hideElements('bolid-options')
        if(bolidCards) {
            hideElements('bolid')
        }
        if (checkDriverCard) {
            hideElements('driver')
        }
    }
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
        if (checkDriverCard){
            hideElements('driver')
        }
    }
    if (garageMenu) {
        hideElements('garage-options')
        if (garageCards) {
        hideElements('garage')
        }
        if(checkTeamPrincipalCard){
            hideElements('teamPrincipal')
        }
    }
})
}


startGame()


          