import { createCarClicker, createCarBackground, createCardElement, createCardNavigation, hideElements, showElements, createPersonCard } from "./displaying-elements.js";
import { slider } from "./DOM-utils.js";
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
    actualSpeed: 50,
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

const bolidElement = document.getElementById('bolid')
bolidElement.addEventListener('click', (e) => {

    if (garageMenu) {
        hideElements('garage-navi');
        if (garageCards) {
            hideElements('garage-cards')
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
        showElements('car-navi')
    } else {
        bolidMenu = true
        createCardNavigation('car-navi', 'Driver', 'Parts')
    }
        const partsCard = document.getElementById('Parts')
        partsCard.addEventListener('click', (e) =>{     
            if (checkPersonal) {
                hideElements('driver')
            }
            if (bolidCards) {
                showElements('car-cards')
            } else {
                bolidCards = true
                createCardElement('car-cards')
                slider('.car-cards-container-slider','.car-cards-element-slider')
            }
        })
        const driverCard = document.getElementById('Driver')
        driverCard.addEventListener('click', (e) => {
            if(bolidCards) {
                hideElements('car-cards')
            }
            if(checkPersonal){
                showElements('driver')
            }
        })
    }
    )
    
const garageElement = document.getElementById('garage')
garageElement.addEventListener('click', (e) => {
        if(bolidMenu) {
            hideElements('car-navi');
            if(bolidCards) {
                hideElements('car-cards')
            }
        }

        if(!checkTeamPrincipal) {
            createPersonCard('teamPrincipal')
            checkTeamPrincipal = true
        } else {
            showElements('teamPrincipal')
        }
        
        if(garageMenu) {
            showElements('garage-navi')
        } else {
            garageMenu = true
            createCardNavigation('garage-navi', 'Facilities' ,'Team Principal')
        }
        
        const facilitiesCard = document.getElementById('Facilities')
        facilitiesCard.addEventListener('click', (e) =>{
            if (checkTeamPrincipal) {
                hideElements('teamPrincipal')
            }
            if(garageCards) {
                showElements('garage-cards')
            } else {
                garageCards = true
                createCardElement('garage-cards')
                slider('.garage-cards-container-slider','.garage-cards-element-slider')
            }
        })
        const TeamPrincipalCard = document.getElementById('Team Principal')
        TeamPrincipalCard.addEventListener('click', (e) => {
            console.log('test')
            if(garageCards) {
                hideElements('garage-cards')
            }
            if(checkTeamPrincipal){
                showElements('teamPrincipal')
            }
        })
})

const homeElement = document.getElementById('home')
homeElement.addEventListener('click', (e) => {
    if (bolidMenu) {
        hideElements('car-navi')
        if (bolidCards) {
            hideElements('car-cards')
        }
        if (checkPersonal){
            hideElements('driver')
        }
    }
    if (garageMenu) {
        hideElements('garage-navi')
        if (garageCards) {
        hideElements('garage-cards')
        }
        if(checkTeamPrincipal){
            hideElements('teamPrincipal')
        }
    }
})

