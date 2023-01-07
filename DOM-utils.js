
const slider = document.querySelector('.selectTabInfo')
const slides = Array.from(document.querySelectorAll('.slide'))


    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        currentIndex = 0


slides.forEach((slide, index) => {
    const slideTab = slide.querySelector('.xd')
    slideTab.addEventListener('dragstart', (e) => e.preventDefault())

    // Touch events
    slideTab.addEventListener('touchstart', touchStart(index))
    slideTab.addEventListener('touchend', touchEnd)
    slideTab.addEventListener('touchmove', touchMove)
    
    // Mouse events
    slideTab.addEventListener('mousedown', touchStart(index))
    slideTab.addEventListener('mouseup', touchEnd)
    slideTab.addEventListener('mouseleave', touchEnd)
    slideTab.addEventListener('mousemove', touchMove)
})


function touchStart(index) {
    return function(event) {
        currentIndex = index
        startPos = getPositionX(event)
        console.log(startPos)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        // slider.classList.add('grabbing')
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if(movedBy < -100 && currentIndex < slides.length - 1)
    currentIndex += 1
    if(movedBy > 100 && currentIndex > 0)
    currentIndex -= 1

    setPositionByIndex()
    // slider.classList.remove('grabbing')

}

function touchMove(event) {
    if(isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
}}

function getPositionX(event) {
    return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition () {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
    console.log('xd')
}