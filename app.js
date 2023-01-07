import { createCarClicker, createCarBackground, createBolidCardElement } from "./displaying-elements.js";

createCarClicker();
createCarBackground();
createBolidCardElement();

const player = {
    actualCoins: 0,
    actualSpeed: 50,
    multiplierSponsors: 1,
    multiplierSpeed: 1,
    addCoins: function () {
        this.actualCoins = this.actualCoins + 1 * this.multiplierSponsors * this.multiplierSpeed;
    },
};


const counter = document.getElementById('money');
const clicker = document.getElementById('clicker');

clicker.addEventListener('click', (e) => {
    player.addCoins();
    counter.textContent = `${player.actualCoins}`;
})

const speed = function () {
    const container = document.getElementById('speed');
    container.textContent = `${player.actualSpeed} km/h`
}
speed();

const bolidElement = document.getElementById('bolid');
bolidElement.addEventListener('click', (e) => {
    createBolidCardElement();
})
