
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
    navigation.classList.add('card-options-container')
    
    container.appendChild(navigation)
    
    const option = document.createElement('div')
    option.id = `${firstOption}-option`
    option.innerText = firstOption
    option.classList.add('card-navigation-option')

    const option2 = document.createElement('div')
    option2.id = `${secondOption}-option`
    option2.innerText = secondOption
    option2.classList.add('card-navigation-option')

    
    navigation.appendChild(option)
    navigation.appendChild(option2)
}

const createCard = function (improvments, action) {
  const card = document.createElement('div')
  card.classList.add('card-content')

  const titleContainer = document.createElement('div')
  titleContainer.classList.add('card-title')
  card.appendChild(titleContainer)

    const title = document.createElement('h1')
    titleContainer.appendChild(title)
    title.innerText = `${improvments.name}`

    const level = document.createElement('p')
    level.id = `${improvments.type}Lvl`
    titleContainer.appendChild(level)
    level.innerText = `Lvl. ${improvments.level}`
      
  
  const cardMainContent = document.createElement('div')
  cardMainContent.classList.add('cardMainContent')
  card.appendChild(cardMainContent)

    const description = document.createElement('p')
    cardMainContent.appendChild(description)
    description.classList.add('description')
    description.innerText = improvments.description
    
    const image = document.createElement('img')
    cardMainContent.appendChild(image)
    image.src = improvments.img

  
  const upgradeContainer = document.createElement('div')
  card.appendChild(upgradeContainer)

      const upgrade = document.createElement('h2')
      upgrade.innerText = 'Upgrade'
      upgradeContainer.classList.add('upgrade')
      
      const cost = document.createElement('p')
      cost.id = `${improvments.type}-price`
      cost.innerText = `${improvments.cost} \u2234`

      upgradeContainer.appendChild(cost)
      upgradeContainer.appendChild(upgrade)

      upgrade.addEventListener('click', (e) => {
        action(improvments)
      })
      

  return card
}

export const createCardElement = function  (category, improvments, action) {
    const container = document.getElementById('selectTabInfo');
    const cardContainer = document.createElement('div');
    container.appendChild(cardContainer)
    cardContainer.classList.add('cards-container')
    cardContainer.classList.add(`${category}-cards-container-slider`)
    cardContainer.id = category

    for (let i=0 ; i < improvments.length; i++) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('cardElement')
        cardElement.classList.add(`${category}-element-slider`)
        cardContainer.appendChild(cardElement)
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add(`${category}-slider`)
        cardElement.appendChild(card)
        
        card.appendChild(createCard(improvments[i], action))
      
      }
    
}

export const createCharacterCard = function (category) {
    const container = document.getElementById('selectTabInfo')

    const cardElement = document.createElement('div')
    cardElement.id = category
    cardElement.classList.add('cardElement')
    container.appendChild(cardElement)
    
    const card = document.createElement('div')
    card.classList.add('card')  
    card.classList.add(`${category}-card`)
    
}

export const createUnlockCharacter = function (object, action) {
  const container = document.getElementById(object.type)
  
  const card = document.createElement('div')
  card.id = `unlock-${object.type}`
  card.classList.add('card')
  card.addEventListener('click', () => {
    action(object)
  })
  container.appendChild(card)

  const title = document.createElement('h1')
  title.innerText = 'Unlock'
  card.appendChild(title)

  const image = document.createElement('img')
  image.src = './img/unlock.webp'
  card.appendChild(image)

  const price = document.createElement('p')
  price.innerText = `${object.cost} \u2234`
  card.appendChild(price)
}

export const createCharacter = function (id, object, action) {
  if (document.getElementById(`unlock-${id}`)) {
    const node = document.getElementById(id)
    const toRemove = document.getElementById(`unlock-${id}`)
    node.removeChild(toRemove)
  }
  const handle = document.getElementById(id)

  const card = document.createElement('div')
  card.id = `${id}-character-card`
  card.classList.add('card')
  handle.appendChild(card)
  const cardContent = document.createElement('div')
  cardContent.classList.add('card-content')
  card.appendChild(cardContent)

    const titleContent = document.createElement('div')
    titleContent.classList.add('card-title')
    cardContent.appendChild(titleContent)

      const title = document.createElement('h1')
      title.innerText = object.name
      titleContent.appendChild(title)

      const level = document.createElement('p')
      level.id = `${id}Lvl`
      level.innerText = `Lvl. ${object.level}`
      titleContent.appendChild(level)

    const subLevelContainer = document.createElement('div')
    subLevelContainer.classList.add('sub-lvl-container')
    titleContent.appendChild(subLevelContainer)

    for( let i = 0; i <=2; i++) {
      const subLevel = document.createElement('div')
      subLevel.classList.add('sub-lvl')
      subLevel.id = `${object.name}-sub-lvl-${i}`
      subLevelContainer.appendChild(subLevel)
    }


    const image = document.createElement('img')
    image.src = object.img
    cardContent.appendChild(image)

    const upgradeContent = document.createElement('div')
    upgradeContent.classList.add('character-upgrade')
    cardContent.appendChild(upgradeContent)
    
    const price = document.createElement('p')
    price.id = `${object.type}-price`
    price.innerText = `${object.cost} \u2234`
    
    const upgrade = document.createElement('h1')
    upgrade.innerText = 'Upgrade'  
    upgradeContent.appendChild(upgrade)
    upgrade.addEventListener('click', (e) => {

      const paramX = object.subLevel
      action(object)
      const paramY = object.subLevel

      if (paramX !== paramY) {
        subUpgrade()
      }
  
    })
    upgradeContent.appendChild(price)

    let subLvl = 0
    const subUpgrade = function () {
      if (subLvl <= 2) {
        const element = document.querySelector(`#${object.name}-sub-lvl-${subLvl}`)
        element.classList.add('sub-lvl-bck')
        subLvl++
        if (subLvl === 3) {
          upgrade.innerText = 'LEVEL UP'
        }
      } else {
        for( let i = 0; i <=2; i++) {
        const element = document.querySelector(`#${object.name}-sub-lvl-${i}`)
        element.classList.remove('sub-lvl-bck')
        upgrade.innerText = 'Upgrade'
        subLvl = 0
      }
    }}



}

export function hideElements (element) {
    const hide = document.getElementById(element)
    hide.style.display = 'none'
}
export function showElements (element) {
    const show = document.getElementById(element)
    if ( element === 'bolid' || 'garage' ) {
     show.style.display = 'inline-flex'
    } else {
     show.style.display = 'flex'
    }
}

export const slider = function (first , second){
    const sliderCon = document.querySelector(first),
    slides = Array.from(document.querySelectorAll(second))
    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID,
        currentIndex = 0
  
  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('.card')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    // mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseleave', touchEnd)
  })
  // make responsive to viewport changes
  window.addEventListener('resize', setPositionByIndex)
  // prevent menu popup on long press
  window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }
  function touchStart(index) {
    return function (event) {
      currentIndex = index
      startPos = getPositionX(event)
      isDragging = true
      animationID = requestAnimationFrame(animation)
      // slider.classList.add('grabbing')
    }
  }
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
    }
  }
  function touchEnd() {
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currentTranslate - prevTranslate
    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
    setPositionByIndex()
    // slider.classList.remove('grabbing')
  }
  function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
  }
  function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()}
    
  function setSliderPosition() {
      sliderCon.style.transform = `translateX(${currentTranslate}px)`
    }
}
  
