import { createHomeBoard, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter} from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal, player, stats } from "./app-elements.js"
import { checkSaveStatus, numbersAdjust, setWindowHeight, setCharacterCard, showCharacter, removeAlertCssClass, loadObjects, createCar, activeStyleNavigation, calcPerSeconds, calculateSpeed, upgrade, addCoins, statsUpDate, unlockSkill} from "./app-utils.js"



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
        if(localStorage.getItem('teamPrincipalAddSkill')){
            unlockSkill(teamPrincipal)
        }
        if(localStorage.getItem('driverAddSkill')){
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
        statsUpDate()
        setSkills()
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
let bolidMenu = false
let bolidCards = false
let garageMenu = false
let garageCards = false
let checkDriverCard = false 
// let driverOwned = driver.bought
let checkTeamPrincipalCard = false 
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



const bolidElement = document.getElementById('bolid-navigation')
if(bolidElement){
bolidElement.addEventListener('click', (e) => {
// check & set navigation status
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

// create/check & set driver card
    if(!checkDriverCard) {
        createCharacterCard('driver')
        checkDriverCard = true
        setCharacterCard(driver)
    } else {
        showCharacter('driver')
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
        })
        const driverCard = document.getElementById('Driver-option')
        driverCard.addEventListener('click', (e) => {

        driverCard.classList.add('pushedKey')    
        partsCard.classList.remove('pushedKey')  

            if(bolidCards) {
                hideElements('bolid')
            }
            if(checkDriverCard){
                showElements('driver') 
            }
        })
    }
    )
}

const garageElement = document.getElementById('garage-navigation')
if(garageElement){
garageElement.addEventListener('click', (e) => {
// check & set navigation status
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

// create/check & set driver card
    if(!checkTeamPrincipalCard) {
        createCharacterCard('teamPrincipal')
        checkTeamPrincipalCard = true
        setCharacterCard(teamPrincipal)
    } else {
        showCharacter('teamPrincipal')
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
    })

    const TeamPrincipalCard = document.getElementById('TeamPrincipal-option')
    TeamPrincipalCard.addEventListener('click', (e) => {
        TeamPrincipalCard.classList.add('pushedKey')    
        facilitiesCard.classList.remove('pushedKey')  

        if(garageCards) {
            hideElements('garage')
        }
        if(checkTeamPrincipalCard){
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
        if (checkDriverCard){
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


startGame()
