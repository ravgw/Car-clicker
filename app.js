import { createCarClicker, createCarBackground, createCardElement, createCardNavigation, hideElements, showElements } from "./displaying-elements.js";
import { ssd } from "./DOM-utils.js";
createCarClicker();
createCarBackground();

let bolidMenu = false;
let garageMenu = false;

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
    if(garageMenu) {
        hideElements('garage-navi');
        hideElements('garage-cards');

    }
    
    if(bolidMenu) {
        showElements('car-navi')
        showElements('car-cards')
        ssd()
    } else {
        bolidMenu = true
        createCardNavigation('car-navi', 'Driver', 'Car parts')
        createCardElement('car-cards')
        ssd()}
    })
    
    
const garageElement = document.getElementById('garage')
garageElement.addEventListener('click', (e) => {
        if(bolidMenu) {
            hideElements('car-navi');
            hideElements('car-cards');
        }
        
        if(garageMenu) {
            showElements('garage-navi')
            showElements('garage-cards')
            ssd()
        } else {
        garageMenu = true
        createCardNavigation('garage-navi', 'Team Principal', 'Facilities')
        createCardElement('garage-cards')
        ssd()}
})

const homeElement = document.getElementById('home')
homeElement.addEventListener('click', (e) => {
    if (bolidMenu) {
        hideElements('car-navi')
    }
    if (garageMenu) {
        hideElements('garage-navi')
    }
})

