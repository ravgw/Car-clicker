export const game = {
    driverActivatedSkillCreated: false,
    teamPrincipalActivatedSkillCreated: false,
    driverSkillStatus: false,
    teamPrincipalSkillStatus: false,
    driverCooldownSkillCreated: false,
    teamPrincipalCooldownSkillCreated: false,
}
export const player = {
    coins:  0,
    speed: 0,
    bonusSpeed: 0,
    teamPrincipalOwned: false,
    driverOwned: false,
    save: function () {
        addStorageItem('playerCoins',this.coins)
    },
    load: function () {
        if(localStorage.getItem('playerCoins')) {
            this.coins = localStorage.getItem('playerCoins')*1
        }
    }
}

export const stats = {
    perClick: 1,
    totalCoins: 0,
    save: function () {
        addStorageItem('statsTotalCoins',this.totalCoins)
    },
    load: function () {
        if(localStorage.getItem('statsTotalCoins')) {
            this.totalCoins = localStorage.getItem('statsTotalCoins')*1
        }
    }
}



const engine = {
    name: 'Engine',
    type: 'engine',
    level: 1,
    value: 1,
    originValue: 1,
    cost: 20,
    lvlUpCostMultiplier: 2.25,
    actionSign: '\u2234',
    description: 'Increase the engine power to gain more speed on straights',
    img: './img/engine.webp',
    upgrade: function () {
        nextLvl(this)
        this.originValue++
        this.calculateValue()
        this.save()
    },
    calculateValue: function () {
        this.value =  Math.round(this.originValue * engineers.value)
    },
    save: function () {
        addStorageItem('engineLevel',this.level)
        addStorageItem('engineValue',this.value)
        addStorageItem('engineOriginValue',this.originValue)
        addStorageItem('engineCost',this.cost)
        addStorageItem('engineCheck','true')
    },
    load: function () {
        if(localStorage.getItem('engineCheck')){
            this.level = localStorage.getItem('engineLevel')*1
            this.value = localStorage.getItem('engineValue')*1
            this.originValue = localStorage.getItem('engineOriginValue')*1
            this.cost = localStorage.getItem('engineCost')*1
        }
    }
}

const engineTest = engine.value

const aerodynamics = {
    name: 'Aerodynamics',
    type: 'aerodynamics',
    level: 0,
    value: 0,
    subValue: 0,
    cost: 40,
    lvlUpCostMultiplier: 2,
    actionSign: '\u2234',
    description: 'Lower aerodynamic drag is equal to higher top speed',
    img: './img/aero.webp',
    upgrade: function () {
        nextLvl(this)
        this.subValue++
        this.calculateValue()
        this.save()
    },
    calculateValue: function () {
        this.value =  Math.round(this.subValue * windTunnel.value)
    },
    save: function () {
        addStorageItem('aeroLevel',this.level)
        addStorageItem('aeroValue',this.value)
        addStorageItem('aeroSubValue',this.subValue)
        addStorageItem('aeroCost',this.cost)
        addStorageItem('aeroCheck','true')
    },
    load: function () {
        if (localStorage.getItem('aeroCheck')) {
            this.level = localStorage.getItem('aeroLevel')*1
            this.value = localStorage.getItem('aeroValue')*1
            this.subValue = localStorage.getItem('aeroSubValue')*1
            this.cost = localStorage.getItem('aeroCost')*1
        }
    }
}
const suspension = {
    name: 'Suspension',
    type: 'suspension',
    level: 0,
    value: 0,
    originValue: 0,
    cost: 120,
    lvlUpCostMultiplier: 2,
    actionSign: '\u2234',
    description: 'Better suspension helps driving through turns faster',
    img: './img/suspension.webp',
    upgrade: function () {
        nextLvl(this)
        this.originValue++
        this.calculateValue()
        this.save()
    },
    calculateValue: function () {
        this.value =  Math.round(this.originValue * engineers.value)
    },
    save: function () {
        addStorageItem('suspensionLevel',this.level)
        addStorageItem('suspensionValue',this.value)
        addStorageItem('suspensionOriginValue',this.originValue)
        addStorageItem('suspensionCost',this.cost)
        addStorageItem('suspensionCheck','true')
    },
    load: function () {
        if (localStorage.getItem('suspensionCheck')) {
            this.level = localStorage.getItem('suspensionLevel')*1
            this.value = localStorage.getItem('suspensionValue')*1
            this.originValue = localStorage.getItem('suspensionOriginValue')*1
            this.cost = localStorage.getItem('suspensionCost')*1
        }
    }
}
const turbo = {
    name: 'Turbo',
    type: 'turbo',
    level: 0,
    value: 0,
    originValue: 0,
    cost: 200,
    lvlUpCostMultiplier: 2,
    actionSign: '\u2234',
    description: 'Speeeeeeeeeeeeeeeeeed',
    img: './img/turbo.webp',
    upgrade: function () {
        nextLvl(this)
        this.originValue++
        this.calculateValue()
        this.save()
    },
    calculateValue: function () {
        this.value =  Math.round(this.originValue * engineers.value)
    },
    save: function () {
        addStorageItem('turboLevel',this.level)
        addStorageItem('turboValue',this.value)
        addStorageItem('turboOriginValue',this.originValue)
        addStorageItem('turboCost',this.cost)
        addStorageItem('turboCheck','true')
    },
    load: function () {
        if (localStorage.getItem('turboCheck')) {
            this.level = localStorage.getItem('turboLevel')*1
            this.value = localStorage.getItem('turboValue')*1
            this.originValue = localStorage.getItem('turboOriginValue')*1
            this.cost = localStorage.getItem('turboCost')*1
        }
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
    value: 1,
    subValue: 0,
    cost: 89000,
    bonus: 1,
    lvlUpCostMultiplier: 11,
    actionSign: '\u2234',
    description: 'Take more money for your speed',
    img: './img/sponsors.webp',
    upgrade: function () {
        nextLvl(this)
        this.value++
        this.save()
    },
    save: function () {
        addStorageItem('sponsorsLevel',this.level)
        addStorageItem('sponsorsValue',this.value)
        addStorageItem('sponsorsSubValue',this.subValue)
        addStorageItem('sponsorsCost',this.cost)
        addStorageItem('sponsorsCheck','true')
    },
    load: function () {
        if (localStorage.getItem('sponsorsCheck')) {
            this.level = localStorage.getItem('sponsorsLevel')*1
            this.value = localStorage.getItem('sponsorsValue')*1
            this.subValue = localStorage.getItem('sponsorsSubValue')*1
            this.cost = localStorage.getItem('sponsorsCost')*1
        }
    }

}
const windTunnel = {
    name: 'Wind tunnel',
    type: 'windTunnel',
    level: 0,
    value: 1,
    cost: 26000,
    lvlUpCostMultiplier: 2,
    actionSign: 'x',
    description: 'Better aerodynamics performance',
    img: './img/windtunnel.webp',
    upgrade: function () {
        nextLvl(this)
        this.value =  Number((this.value + .5).toPrecision(2))
        aerodynamics.calculateValue()
        this.save()
    },
    save: function () {
        addStorageItem('windTunnelLevel',this.level)
        addStorageItem('windTunnelValue',this.value)
        addStorageItem('windTunnelCost',this.cost)
        addStorageItem('windTunnelCheck','true')
    },
    load: function () {
        if (localStorage.getItem('windTunnelCheck')) {
            this.level = localStorage.getItem('windTunnelLevel')*1
            this.value = localStorage.getItem('windTunnelValue')*1
            this.cost = localStorage.getItem('windTunnelCost')*1
        }
    }
}
const engineers = {
    name: 'Engineers',
    type: 'engineers',
    level: 0,
    value: 1,
    cost: 3000,
    lvlUpCostMultiplier: 2,
    actionSign: 'x',
    description: 'Hire appropriate people to improve bolid parts efficient',
    img: './img/engineers.webp',
    upgrade: function () {
        nextLvl(this)
        this.value =  Number((this.value + .25).toPrecision(3))
        engine.calculateValue()
        suspension.calculateValue()
        turbo.calculateValue()
        this.save()
    },
    save: function () {
        addStorageItem('engineersLevel',this.level)
        addStorageItem('engineersValue',this.value)
        addStorageItem('engineersCost',this.cost)
        addStorageItem('engineersCheck','true')
    },
    load: function () {
        if (localStorage.getItem('engineersCheck')) {
            this.level = localStorage.getItem('engineersLevel')*1
            this.value = localStorage.getItem('engineersValue')*1
            this.cost = localStorage.getItem('engineersCost')*1
        }
    }
}
// const fame = {
//     name: '?Fame?',
//     type: 'fame',
//     level: 0,
//     value: 0,
//     cost: 33000,
//     lvlUpCostMultiplier: 4,
//     actionSign: 'x',
//     description: 'skills time duration',
//     img: './img/fame.webp',
//     upgrade: function () {
//         nextLvl(this)
//         this.value = Math.round(this.value + 2)
//         sponsors.bonus = this.value
//         // sponsors.calculateValue()
//         this.save()
//     },
//     save: function () {
//         addStorageItem('fameLevel',this.level)
//         addStorageItem('fameValue',this.value)
//         addStorageItem('fameCost',this.cost)
//         addStorageItem('fameCheck','true')
//     },
//     load: function () {
//         if (localStorage.getItem('fameCheck')) {
//             this.level = localStorage.getItem('fameLevel')*1
//             this.value = localStorage.getItem('fameValue')*1
//             this.cost = localStorage.getItem('fameCost')*1
//         }
//     }
// }

export const garageFacilities = [
    sponsors,
    windTunnel,
    engineers,
    // fame
]

export const driver = {
    name: 'Jurek',
    type: 'driver',
    bought: false,
    addSkill: false,
    skillCreated: false,
    skillDuration: 20,
    skillId: '#skill-1',
    skillCooldown: 9,
    skillCurrentCooldown: 0,
    skillCurrentCooldownSec: 59,
    skillStatus: false,
    skillAvailability: true,
    skillDescription: `Gain x2 speed`,
    level: 1,
    maxLevel: false,
    value: 1,
    multiplier: 1,
    cost: 7000,
    lvlUpCostMultiplier: 2,
    img: './img/jurek.webp',
    save: function () {
        addStorageItem('driverBought',this.bought)
        addStorageItem('driverAddSkill',this.addSkill)
        addStorageItem('driverSkillDuration', this.skillDuration)
        addStorageItem('driverSkillCooldown', this.skillCooldown)
        addStorageItem('driverCurrentCooldown',this.skillCurrentCooldown)
        addStorageItem('driverCurrentCooldownSec',this.skillCurrentCooldownSec)
        addStorageItem('driverSkillAvailability', this.skillAvailability)
        addStorageItem('driverLevel',this.level)
        addStorageItem('driverMaxLevel',this.maxLevel)
        addStorageItem('driverValue',this.value)
        addStorageItem('driverCost',this.cost)
        addStorageItem('driverCheck','true')
    },
    load: function () {
        if (localStorage.getItem('driverCheck')) {
            this.bought = localStorage.getItem('driverBought')
            this.addSkill = localStorage.getItem('driverAddSkill')
            this.skillDuration = localStorage.getItem('driverSkillDuration')*1
            this.skillCooldown = localStorage.getItem('driverSkillCooldown')*1
            this.skillCurrentCooldown = localStorage.getItem('driverCurrentCooldown')*1
            this.skillCurrentCooldownSec = localStorage.getItem('driverCurrentCooldownSec')*1
            this.skillAvailability = localStorage.getItem('driverSkillAvailability')
            this.level = localStorage.getItem('driverLevel')*1
            this.maxLevel = (JSON.parse(localStorage.getItem('driverMaxLevel')))
            this.value = localStorage.getItem('driverValue')*1
            this.cost = localStorage.getItem('driverCost')*1
        }
    },
    upgrade: function () {

        if(!this.maxLevel) {

            this.level++
            this.cost = Math.round(this.cost * this.lvlUpCostMultiplier)
            const x = Number((this.value + .05).toPrecision(3))
            this.value = x
            if (this.level === 2) {
                this.addSkill = true
                this.skillAvailability = true
            }
            upgradeSkill(this)
        }

        if(this.level === 10) {
            this.maxLevel = true
        }
        this.save()
    },

    skillTimer: function (callback) {
        this.skillAvailability = false
        
        const displayCounter = document.querySelector('#driver-cooldown-timer')
        
        const timer = function () {
            addStorageItem('driverCurrentCooldown',driver.skillCurrentCooldown)
            if (driver.skillCurrentCooldown > 1) {
                console.log('wkszy od 1')
                setTimeout(()=>{
                    driver.skillCurrentCooldown--
                    displayCounter.innerText = driver.skillCurrentCooldown + 'm'
                    timer()
                },60*1000)
            } else if (driver.skillCurrentCooldown === 1) {
                let i = driver.skillCurrentCooldownSec
                const seconds = function() {
                    if (i >= 1) {
                        addStorageItem('driverCurrentCooldown',driver.skillCurrentCooldown)
                        setTimeout(()=> {
                            i--
                            driver.skillCurrentCooldownSec = i
                            addStorageItem('driverCurrentCooldownSec',driver.skillCurrentCooldownSec)
                            displayCounter.innerText = i + 's'
                            seconds()},1000)
                        } else {
                            driver.skillAvailability = true
                            driver.skillCurrentCooldown = 0
                            addStorageItem('driverCurrentCooldown',driver.skillCurrentCooldown)
                            driver.skillCurrentCooldownSec = 59
                            addStorageItem('driverCurrentCooldownSec',driver.skillCurrentCooldownSec)
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
    skillCreated: false,
    skillId: '#skill-2',
    skillDuration: 25,
    skillCooldown: 7,
    skillCurrentCooldown: 0,
    skillCurrentCooldownSec: 59,
    skillAvailability: true,
    skillDescription: `Speed up time x4`,
    level: 1,
    maxLevel: false,
    value: 1,
    multiplier: 1,
    cost: 900,
    lvlUpCostMultiplier: 2,
    img: './img/mateusz.webp',
    save: function () {
        addStorageItem('teamPrincipalBought',this.bought)
        addStorageItem('teamPrincipalAddSkill',this.addSkill)
        addStorageItem('teamPrincipalSkillDuration', this.skillDuration)
        addStorageItem('teamPrincipalSkillCooldown', this.skillCooldown)
        addStorageItem('teamPrincipalCurrentCooldown',this.skillCurrentCooldown)
        addStorageItem('teamPrincipalCurrentCooldownSec',this.skillCurrentCooldownSec)
        addStorageItem('teamPrincipalSkillAvailability', this.skillAvailability)
        addStorageItem('teamPrincipalLevel',this.level)
        addStorageItem('teamPrincipalMaxLevel',this.maxLevel)
        addStorageItem('teamPrincipalValue',this.value)
        addStorageItem('teamPrincipalCost',this.cost)
        addStorageItem('teamPrincipalCheck','true')
    },
    load: function () {
        if (localStorage.getItem('teamPrincipalCheck')) {
            this.bought = localStorage.getItem('teamPrincipalBought')
            this.addSkill = localStorage.getItem('teamPrincipalAddSkill')
            this.skillDuration = localStorage.getItem('teamPrincipalSkillDuration')*1
            this.skillCooldown = localStorage.getItem('teamPrincipalSkillCooldown')*1
            this.skillCurrentCooldown = localStorage.getItem('teamPrincipalCurrentCooldown')*1
            this.skillCurrentCooldownSec = localStorage.getItem('teamPrincipalCurrentCooldownSec')*1
            this.skillAvailability = localStorage.getItem('teamPrincipalSkillAvailability')
            this.level = localStorage.getItem('teamPrincipalLevel')*1
            this.maxLevel = (JSON.parse(localStorage.getItem('teamPrincipalMaxLevel')))
            this.value = localStorage.getItem('teamPrincipalValue')*1
            this.cost = localStorage.getItem('teamPrincipalCost')*1
        }
    },
    upgrade: function () {
        if (!this.maxLevel) {
            this.level++
            this.cost = Math.round(this.cost * this.lvlUpCostMultiplier)
            const x = (this.value + .5)
            this.value = x

            if (this.level === 2) {
                this.addSkill = true
                this.skillAvailability = true
            }
            upgradeSkill(this)
        }

        if(this.level === 10) {
            this.maxLevel = true
        }
        
        this.save()
    },
    skillTimer: function (callback) {
        this.skillAvailability = false
        
        const displayCounter = document.querySelector('#teamPrincipal-cooldown-timer')
        
        const timer = function () {
            addStorageItem('teamPrincipalCurrentCooldown',teamPrincipal.skillCurrentCooldown)
            if (teamPrincipal.skillCurrentCooldown > 1) {
                console.log('wkszy od 1')
                setTimeout(()=>{
                    teamPrincipal.skillCurrentCooldown--
                    displayCounter.innerText = teamPrincipal.skillCurrentCooldown + 'm'
                    timer()
                },60*1000)
            } else if (teamPrincipal.skillCurrentCooldown === 1) {
                let i = teamPrincipal.skillCurrentCooldownSec
                const seconds = function() {
                    if (i >= 1) {
                        addStorageItem('teamPrincipalCurrentCooldown',teamPrincipal.skillCurrentCooldown)
                        setTimeout(()=> {
                            i--
                            teamPrincipal.skillCurrentCooldownSec = i
                            addStorageItem('teamPrincipalCurrentCooldownSec',teamPrincipal.skillCurrentCooldownSec)
                            displayCounter.innerText = i + 's'
                            seconds()},1000)
                        } else {
                            teamPrincipal.skillAvailability = true
                            teamPrincipal.skillCurrentCooldown = 0
                            addStorageItem('teamPrincipalCurrentCooldown',teamPrincipal.skillCurrentCooldown)
                            teamPrincipal.skillCurrentCooldownSec = 59
                            addStorageItem('teamPrincipalCurrentCooldownSec',teamPrincipal.skillCurrentCooldownSec)
                            callback()
                    }
                } 
            seconds()
            }
        }
        timer()
    }
}

const nextLvl = function (object) {
    object.level++
    object.cost = Math.round(object.cost * object.lvlUpCostMultiplier)
}

const addStorageItem = function (key,value) {
    localStorage.setItem(key,(value).toString())
}

const upgradeSkill = function (character) {
    if (character.level%2 === 0) {
        character.skillDuration = character.skillDuration + 5
        character.skillCooldown = character.skillCooldown - 1 
    }
}
