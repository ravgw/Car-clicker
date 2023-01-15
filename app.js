import { createCarClicker, createCarBackground, createCardElement, createCardNavigation, hideElements, showElements, createPersonCard, slider } from "./displaying-elements.js";

createCarClicker();
createCarBackground();

let bolidMenu = false;
let bolidCards = false;
let garageMenu = false;
let garageCards = false;
let checkPersonal = false 
let checkTeamPrincipal = false 

const player = {
    actualCoins: 0,
    actualSpeed: 1,
    multiplierSponsors: 1,
    multiplierSpeed: 1,
    addCoins: function () {
        this.actualCoins = this.actualCoins + 1 * this.multiplierSponsors * this.multiplierSpeed;
    },
};


const counter = document.getElementById('money')
const clicker = document.getElementById('clicker')



clicker.addEventListener('click', (e) => {
    player.addCoins();
    counter.textContent = `${player.actualCoins}`;
})

const speed = function () {
    const container = document.getElementById('speed');
    container.textContent = `${player.actualSpeed} km/h`
}

speed();

const bolidElement = document.getElementById('bolid-navigation')
bolidElement.addEventListener('click', (e) => {

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
        createPersonCard('driver')
        checkPersonal = true
    } else {
        showElements('driver')
    }


    if(bolidMenu) {
        showElements('bolid-options')
    } else {
        bolidMenu = true
        createCardNavigation('bolid-options', 'Driver', 'Parts')
    }
        const partsCard = document.getElementById('Parts-option')
        partsCard.addEventListener('click', (e) =>{     
            if (checkPersonal) {
                hideElements('driver')
            }
            if (bolidCards) {
                showElements('bolid')
            } else {
                bolidCards = true
                createCardElement('bolid')
                slider('.bolid-cards-container-slider','.bolid-element-slider')
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
            createPersonCard('teamPrincipal')
            checkTeamPrincipal = true
        } else {
            showElements('teamPrincipal')
        }
        
        if(garageMenu) {
            showElements('garage-options')
        } else {
            garageMenu = true
            createCardNavigation('garage-options', 'Facilities' ,'Team Principal')
        }
        
        const facilitiesCard = document.getElementById('Facilities-option')
        facilitiesCard.addEventListener('click', (e) =>{
            if (checkTeamPrincipal) {
                hideElements('teamPrincipal')
            }
            if(garageCards) {
                showElements('garage')
            } else {
                garageCards = true
                createCardElement('garage')
                slider('.garage-cards-container-slider','.garage-element-slider')
            }
        })
        const TeamPrincipalCard = document.getElementById('Team Principal-option')
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

