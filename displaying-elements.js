// import { slider } from "./DOM-utils.js";

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
const frontTyre = document.createElement('p');
frontTyre.classList.add('tyres');

const rearRim = document.createElement('p');
rearRim.classList.add('rims')
const frontRim = document.createElement('p');
frontRim.classList.add('rims')

const driverBody = document.createElement('p');
driverBody.id = 'driverBody';


clicker.appendChild(carBodyRear);
clicker.appendChild(carBodyFront);

carBodyRear.appendChild(door);
carBodyRear.appendChild(driverBody);

carBodyRear.appendChild(rearTyre);
carBodyFront.appendChild(frontTyre);

carBodyRear.appendChild(rearRim);
carBodyFront.appendChild(frontRim);

}  

export const createCarBackground = function () {
    const container = document.getElementById('carBackground');

    for (let i = 0; i < 3; i++){
        const clouds = document.createElement('p');
        clouds.classList.add('clouds');
        clouds.id = 'cloud' + (i+1);
        container.appendChild(clouds);
    }

    const fans = document.createElement('p');
    fans.id = 'fans';
    container.appendChild(fans); 
    const kerbs = document.createElement('p');
    kerbs.id = 'kerbs';
    const track =document.createElement('p');
    track.id = 'track';
    container.appendChild(track);
    container.appendChild(kerbs);
    
}

export const createBolidCardElement = function  () {
    const container = document.getElementById('selectTabInfo');
    for (let i=0 ; i <5; i++) {
        const bolidCard = document.createElement('div');
        const test = document.createElement('div')
        test.classList.add('xd')
        // const img = document.createElement('img')
        // img.src = './fans.webp';
        bolidCard.classList.add('slide')
        container.appendChild(bolidCard)
        bolidCard.appendChild(test);
        // bolidCard.appendChild(img)}
}}