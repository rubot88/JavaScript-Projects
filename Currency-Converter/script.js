const curItem1 = document.querySelector('.cur-item-1')
const curItem2 = document.querySelector('.cur-item-2')
const curInput1 = document.querySelector('.cur-input-1')
const curInput2 = document.querySelector('.cur-input-2')

const rateBox = document.querySelector('.rate-box')
const changeBtn = document.querySelector('.fa-retweet')

function calc() {
    const curItem1Value = curItem1.value
    const curItem2Value = curItem2.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${curItem1Value}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[curItem2Value]

            rateBox.textContent = `1 ${curItem1Value} = ${rate.toFixed(4)} ${curItem2Value}`

            curInput2.value = (curInput1.value * rate).toFixed(2)
        })
}

function listeners() {
    curItem1.addEventListener('change', calc)
    curItem2.addEventListener('change', calc)
    curInput1.addEventListener('input', calc)
    curInput2.addEventListener('input', calc)

    changeBtn.addEventListener('click', () => {

        [curItem1.value, curItem2.value] = [curItem2.value, curItem1.value]
        calc()
        changeBtn.classList.toggle('rotate-btn')
    })
}

window.onload = () => {
    listeners()
    calc()
}
