import { createCarClicker, createCarBackground, createCardElement, createCardNavigation, hideElements, showElements, createCharacterCard, slider, createUnlockCharacter, createCharacter } from "./dom-utils.js";
import { bolidParts, garageFacilities, driver, teamPrincipal } from "./app-elements.js"

createCarClicker();
createCarBackground();
console.log( (2137 * (10  ** -3)).toPrecision(3))

const counter = document.getElementById('money')
const clicker = document.getElementById('clicker')

let bolidMenu = false;
let bolidCards = false;
let garageMenu = false;
let garageCards = false;
let checkPersonal = false 
let checkTeamPrincipal = false 

const player = {
    actualCoins: 999000,
    actualSpeed: 1,
    multiplierSponsors: 1,
    multiplierSpeed: 1,
    driver: false,
    teamPrincipal: false,
    addCoins: function () {
        this.actualCoins = this.actualCoins + 1 * this.multiplierSponsors * this.multiplierSpeed;
    },
    spendCoins: function (cost) {
        if(this.actualCoins >= cost) {
            this.actualCoins = this.actualCoins - cost
            counter.innerText = this.actualCoins
        }
    },
};





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
        createCharacterCard('driver')
        checkPersonal = true
        if(!player.driver) {
            createUnlockCharacter(driver, buyCharacter)
            // const card = document.getElementById('driver')
            // card.addEventListener('click', (e) => {
            //     if( player.actualCoins >= 200 && !player.driver) {
            //         player.driver = true
            //         createCharacter('driver', driver)
            //     } else {
            //         console.log('karolina to pieczarki' + player.driver)
            //     }
            // })
        }
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
                createCardElement('bolid', bolidParts )
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
            createCharacterCard('teamPrincipal')
            checkTeamPrincipal = true
            if(!player.teamPrincipal) {
                createUnlockCharacter(teamPrincipal, buyCharacter)
                // const card = document.getElementById('teamPrincipal')
                // card.addEventListener('click', (e) => {
                //     if( player.actualCoins >= 2 && !player.teamPrincipal) {
                //         player.teamPrincipal = true
                //         createCharacter('teamPrincipal', teamPrincipal)
                //     } else {
                //         console.log('karolina to pieczarki' + player.driver)
                //     }
                // })
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
                showElements('garage')
            } else {
                garageCards = true
                createCardElement('garage', garageFacilities)
                slider('.garage-cards-container-slider','.garage-element-slider')
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
    let character = object.function
    if (!object.bought) {
        if(player.actualCoins >= object.cost) {
            player[`${character}`] = 'true'
            player.spendCoins(object.cost)
            createCharacter(character, object, upgrade)
        } else {
            console.log('not enaugh money - buy character')
        }
    } 
}

const upgrade = function (object) {
    if(verifyCoinnsAmount(object)) {
        player.spendCoins(object.cost)
        object.upgrade()
        document.getElementById(`${object.function}Lvl`).innerText = 'Lvl. ' + object.lvl
    } else { 
        console.log('not enaugh money - upgrade')
        counterAdjust()
        // console.log(player.actualCoins + 'mój kasz')
    }
}

const verifyCoinnsAmount = function (object) {
    if(player.actualCoins >= object.cost) {
        return true
    }
}

const coinsAmount = []
const coinsAmountName = ['k','m','t','aa','ab','ac','ad','ae','af','ag']


const counterAdjust = function () {
    for ( let i = 1; i < 11; i++) {
        let base = 3
        const next = base * i
        coinsAmount.push(next)     
    }
    
}