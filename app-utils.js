
const coinsAmount = []
const coinsAmountName = ['k','m','t','aa','ab','ac','ad','ae','af','ag']


const counterParam1 = function () {
    for ( let i = 1; i < 11; i++) {
        let base = 3
        const next = base * i
        coinsAmount.push(next)     
    }
}

let counterParam1Check = false
export const numbersAdjust = function (toAdjust, target) {
 
    if (!counterParam1Check){
        counterParam1()
        counterParam1Check = true
    }

    const coins = Math.floor(toAdjust)
    
    for (let i = 0; i <= coinsAmount.length; i++) {
        
        if 
        (coins < 10 ** coinsAmount[i]) 
        {
            target.innerText = `${coins} \u2234`
            // console.log(target)
            // target.innerText = '131313'
            break
        } 
        else if 
        (coins > 10 ** coinsAmount[i] && coins < 10 ** coinsAmount[i + 1]) 
        {
            const value = (coins * (10 ** -(coinsAmount[i]))).toFixed(1)
            target.innerText = `${value}${coinsAmountName[i]} \u2234`
            break
        }
    }
}
