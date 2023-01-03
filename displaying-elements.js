
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

    const track =document.createElement('p');
    track.id = 'track';
    container.appendChild(track);
    
}