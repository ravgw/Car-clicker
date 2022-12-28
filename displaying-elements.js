
export const createCarClicker = function () {
const clicker = document.getElementById('clicker');

const carBodyRear = document.createElement('p');
carBodyRear.id = 'carBodyRear';
const carBodyFront = document.createElement('p');
carBodyFront.id = 'carBodyFront';
const  door = document.createElement('p');
door.id = 'door';
const rearTyre = document.createElement('p');
rearTyre.classList.add('tyres');
const rearRim = document.createElement('p');
rearRim.classList.add('rim');
const frontTyre = document.createElement('p');
frontTyre.classList.add('tyres');
const frontRim = document.createElement('p');
frontRim.classList.add('rim');

clicker.appendChild(carBodyRear);
clicker.appendChild(carBodyFront);
carBodyRear.appendChild(door);
carBodyRear.appendChild(rearTyre);
rearTyre.appendChild(rearRim);
carBodyFront.appendChild(frontTyre);
frontTyre.appendChild(frontRim);
}  