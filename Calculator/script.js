const output = document.querySelector('output')

const div = document.createElement('div')
div.classList.add('keyboard')
document.querySelector('.calculator').appendChild(div)

'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='.split(' ')
    .map(symbol => {
        div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
    })

div.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        calc(e.target.value)
    }
})

document.addEventListener('keydown', e => {
    if ((e.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(e.key)
})

function calc(value) {
    if (value.match(/=|Enter/)) {
        try {
            if (output.textContent !== '') {
                output.textContent = Math.trunc(math.evaluate(output.textContent))
            }
        } catch {
            let oldValue = output.textContent
            let newValue = 'недопустимое выражение'

            output.textContent = newValue
            const timer = setTimeout(() => {
                output.textContent = oldValue
                clearTimeout(timer)
            }, 1500)
        }
    } else if (value === 'C') {
        output.textContent = ''
    } else if (value.match(/CE|Backspace/)) {
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else {
        output.textContent += value
    }
}
