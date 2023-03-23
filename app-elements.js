const clog = function (param) {
    console.log(param)
}


const engine = {
    name: 'Engine',
    type: 'engine',
    level: 1,
    value: 1,
    subValue: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: '\u2234',
    description: 'Increase the engine power to gain more speed on straights',
    img: './img/engine.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
    },
    calculateValue: function () {
        this.value = this.subValue * engineers.value
    }
}
const aerodynamics = {
    name: 'Aerodynamics',
    type: 'aerodynamics',
    level: 0,
    value: 0,
    subValue: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: '\u2234',
    description: 'Lower aerodynamic drag is equal to higher top speed',
    img: './img/aero.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
    },
    calculateValue: function () {
        this.value = this.subValue * windTunnel.value
    }
}
const suspension = {
    name: 'Suspension',
    type: 'suspension',
    level: 0,
    value: 0,
    subValue: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: '\u2234',
    description: 'Better suspension helps driving through turns faster',
    img: './img/suspension.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
    },
    calculateValue: function () {
        this.value = this.subValue * engineers.value
    }
}
const turbo = {
    name: 'Turbo',
    type: 'turbo',
    level: 0,
    value: 0,
    subValue: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: '\u2234',
    description: 'Speeeeeeeeeeeeeeeeeed',
    img: './img/turbo.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
    },
    calculateValue: function () {
        this.value = this.subValue * engineers.value
    }
}

export const bolidParts = [
    engine,
    aerodynamics,
    suspension,
    turbo
]

const sponsors = {
    name: 'Sponsors',
    type: 'sponsors',
    level: 0,
    value: 0,
    subValue: 0,
    cost: 10,
    bonus: 1,
    lvlUpCost: 3,
    actionSign: '\u2234',
    description: 'Take more money for your speed',
    img: './img/sponsors.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
        console.log(this.value + 'sponsors')
    },
    calculateValue: function () {
        this.value = this.subValue * this.bonus
    }
}
const windTunnel = {
    name: 'Wind tunnel',
    type: 'windTunnel',
    level: 0,
    value: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: 'x',
    description: 'Better aerodynamics performance',
    img: './img/windtunnel.webp',
    upgrade: function () {
        nextLvl(this)
        this.value = this.value + .2
        aerodynamics.calculateValue()
    },
}
const engineers = {
    name: 'Engineers',
    type: 'engineers',
    level: 0,
    value: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: 'x',
    description: 'Hire appropriate people to improve bolid parts efficient',
    img: './img/engineers.webp',
    upgrade: function () {
        nextLvl(this)
        this.value = this.value + .2
        engine.calculateValue()
        suspension.calculateValue()
        turbo.calculateValue()
    },
}
const fame = {
    name: 'Fame',
    type: 'fame',
    level: 0,
    value: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    actionSign: 'x',
    description: 'Grow the celebrity of your team to attract richer sponsors',
    img: './img/fame.webp',
    upgrade: function () {
        nextLvl(this)
        this.value = this.value + 2
        sponsors.bonus = this.value
        sponsors.calculateValue()
    },
}

export const garageFacilities = [
    sponsors,
    windTunnel,
    engineers,
    fame
]

export const driver = {
    name: 'Jurek',
    type: 'driver',
    bought: false,
    addSkill: false,
    skillDuration: 2,
    skillId: '#skill-1',
    skillCooldown: 3,
    skillCurrentCooldown: 0,
    skillAvailability: true,
    skillDescription: `Gain x2 speed`,
    level: 1,
    subLevel: 0,
    value: 1,
    multiplier: 1,
    cost: 25,
    lvlUpCost: 2,
    img: './img/jurek.webp',
    upgrade: function () {

        if (this.subLevel === 3){
            this.level++
            this.subLevel = 0
        } else {
            this.subLevel++
        }

        this.cost = Math.round(this.cost * this.lvlUpCost)
        const x = (this.value + .05)
        this.value = x

        if (this.level === 2 && this.subLevel === 0) {
            this.addSkill = true
        } else {
            this.addSkill = false
        }
    },
    skillTimer: function (callback) {
        this.skillAvailability = false

        const displayCounter = document.querySelector('#driver-cooldown-timer')

        console.log('skilltimer')
        const timer = function () {
        if (driver.skillCooldown > 1) {
            setTimeout(()=>{
                driver.skillCooldown--
                displayCounter.innerText = driver.skillCooldown
                timer()
            },1000)
        } else if (driver.skillCooldown === 1) {
            let i = 10
            const seconds = function() {
                console.log('seconds')
                if (i >= 1) {
                setTimeout(()=> {
                    displayCounter.innerText = i + 's'
                    i--
                    seconds()
                },1000)
            } else {
                driver.skillAvailability = true
                driver.skillCooldown = 5
                callback()
            }
        } 
        seconds()
    }
}
timer()
}
    }

export const teamPrincipal = {
    name: 'Mateusz',
    type: 'teamPrincipal',
    bought: false,
    addSkill: false,
    skillId: '#skill-2',
    skillDuration: 4,
    skillCooldown: 5,
    skillCurrentCooldown: 0,
    skillAvailability: true,
    skillDescription: `Speed up time x4`,
    level: 1,
    subLevel: 0,
    value: 1,
    multiplier: 1,
    cost: 50,
    lvlUpCost: 2,
    img: './img/mateusz.webp',
    upgrade: function () {

        if (this.subLevel === 3){
            this.level++
            this.subLevel = 0
        } else {
            this.subLevel++
        }

        this.cost = Math.round(this.cost * this.lvlUpCost)
        const x = (this.value + .5)
        this.value = x

        if (this.level === 2 && this.subLevel === 0) {
            this.addSkill = true
        } else {
            this.addSkill = false
        }
    },
    skillTimer: function (callback) {

        this.skillAvailability = false

        const displayCounter = document.querySelector(`#${this.type}-cooldown-timer`)

        this.skillAvailability = false

        console.log('skilltimer')
        const timer = function () {
        if (driver.skillCooldown >= 1) {
            setTimeout(()=>{
                driver.skillCooldown--
                displayCounter.innerText = driver.skillCooldown
                timer()
            },1000)
        } else if (driver.skillCooldown === 0) {
            driver.skillAvailability = true
            driver.skillCooldown = 5
            callback()
        }
    }
    timer()


    }
}

const nextLvl = function (object) {
    object.level++
    object.cost = Math.round(object.cost * object.lvlUpCost)
    object.multiplier = Math.round(object.multiplier * 1.2)
}
