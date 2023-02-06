const engine = {
    name: 'Engine',
    type: 'engine',
    level: 1,
    value: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Increase the engine power to gain more speed on straights',
    img: './img/engine.webp',
    upgrade: function () {
        upgrade(this)
    },
}
const aerodynamics = {
    name: 'Aerodynamics',
    type: 'aerodynamics',
    level: 0,
    value: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Lower aerodynamic drag is equal to higher top speed',
    img: './img/aero.webp',
    upgrade: function () {
        upgrade(this)
        this.value = this.value * windTunnel.value
    },
}
const suspension = {
    name: 'Suspension',
    type: 'suspension',
    level: 0,
    value: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Better suspension helps driving through turns faster',
    img: './img/suspension.webp',
    upgrade: function () {
        upgrade(this)
    },
}
const turbo = {
    name: 'Turbo',
    type: 'turbo',
    level: 0,
    value: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Speeeeeeeeeeeeeeeeeed',
    img: './img/turbo.webp',
    upgrade: function () {
        upgrade(this)
    },
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
    value: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 3,
    description: 'Take more money for your speed',
    img: './img/sponsors.webp',
    upgrade: function () {
        nextLvl(this)
        this.value = this.value * 2
    },
}
const windTunnel = {
    name: 'Wind tunnel',
    type: 'windTunnel',
    level: 0,
    value: 1,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Better aerodynamics performance',
    img: './img/windtunnel.webp',
    upgrade: function () {
        nextLvl(this)
        this.value = this.value + .2
        aerodynamics.value = aerodynamics.value
    },
}
const engineers = {
    name: 'Engineers',
    type: 'engineers',
    level: 0,
    value: 0,
    cost: 10,
    multiplier: 1,
    lvlUpCost: 2,
    description: 'Hire appropriate people to improve bolid parts efficient',
    img: './img/engineers.webp',
    upgrade: function () {
        nextLvl(this)
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
    description: 'Grow the celebrity of your team to attract richer sponsors',
    img: './img/fame.webp',
    upgrade: function () {
        nextLvl(this)
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
    },
    }
export const teamPrincipal = {
    name: 'Mateusz',
    type: 'teamPrincipal',
    bought: false,
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
    },
}


const upgrade = function  (object) {
    object.level++
    object.value++
    nextLvl(object)
}

const nextLvl = function (object) {
    object.level++
    object.cost = Math.round(object.cost * object.lvlUpCost)
    object.multiplier = Math.round(object.multiplier * 1.2)
}
