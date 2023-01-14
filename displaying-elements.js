

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

export const createCardNavigation = function (category, firstOption, secondOption) {
    const container = document.getElementById('navigation')
    const navigation = document.createElement('div')
    navigation.id = category;
    navigation.classList.add('card-navigation-container')
    
    container.appendChild(navigation)
    
    const option = document.createElement('div')
    option.id = `${firstOption}-navigation`
    option.innerText = firstOption
    option.classList.add('card-navigation-option')

    const option2 = document.createElement('div')
    option2.id = `${secondOption}-navigation`
    option2.innerText = secondOption
    option2.classList.add('card-navigation-option')

    
    navigation.appendChild(option)
    navigation.appendChild(option2)
}

export const createCardElement = function  (category) {
    const container = document.getElementById('selectTabInfo');
    const cardContainer = document.createElement('div');
    container.appendChild(cardContainer)
    cardContainer.classList.add('cards-container')
    cardContainer.classList.add(`${category}-cards-container-slider`)
    cardContainer.id = category
    for (let i=0 ; i <5; i++) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('cardElement')
        cardElement.classList.add(`${category}-element-slider`)
        cardContainer.appendChild(cardElement)
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add(`${category}-slider`)
        cardElement.appendChild(card)}
}

export const createPersonCard = function (category) {
    const container = document.getElementById('selectTabInfo')

    const cardElement = document.createElement('div')
    cardElement.id = category
    cardElement.classList.add('cardElement')
    container.appendChild(cardElement)
    
    const card = document.createElement('div')
    card.classList.add('card')
    card.classList.add(`${category}-card`)
    cardElement.appendChild(card)
}

export function hideElements (element) {
    const hide = document.getElementById(element)
    hide.style.display = 'none'
}
export function showElements (element) {
    const show = document.getElementById(element)
    if ( element === 'car' || 'garage' ) {
     show.style.display = 'inline-flex'
    } else {
     show.style.display = 'flex'
    }
}