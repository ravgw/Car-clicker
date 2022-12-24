import { createCarClicker } from "./displaying-elements.js";

createCarClicker();
const player = {
    actualCoins: 0,
    multiplier: 10,
    addCoins: function () {
        this.actualCoins = this.actualCoins + 1 * this.multiplier;
    },
};


const counter = document.getElementById('counter');

const clicker = document.getElementById('clicker');

clicker.addEventListener('click', (e) => {
    player.addCoins();
    counter.textContent = `${player.actualCoins}$`;
})