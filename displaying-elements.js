
export const createCarClicker = function () {
const clicker = document.getElementById('clicker');

const carBodyRear = document.createElement('p');
carBodyRear.id = 'carBodyRear';
const carBodyFront = document.createElement('p');
carBodyFront.id = 'carBodyFront';
const rearTyre = document.createElement('p');
rearTyre.classList.add('tyres');

clicker.appendChild(carBodyRear);
clicker.appendChild(carBodyFront);
}  