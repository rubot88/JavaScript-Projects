const messageElement = document.querySelector('.message')

const randomNumber = Math.floor(Math.random() * 100) + 1

let playable = true

console.log(randomNumber)

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

recognition.start()

function speak(e) {
    const num = +e.results[0][0].transcript

    messageElement.innerHTML = `<p>Вы сказали: ${num}</p>`
    checkNumber(num)
}

function checkNumber(num) {
    if (Number.isNaN(num)) {
        messageElement.innerHTML = `<p>Назовите число!</p>`
        return
    }

    if (num > 100 || num < 1) {
        messageElement.innerHTML = `<p>Число должно быть от 1 до 100</p>`
        return
    }

    if (num === randomNumber) {
        document.body.innerHTML = `
<h3>Поздравляем! Вы угадали число.</h3>
<button>Заново</button>
`
        playable = false
    } else if (num > randomNumber) {
        messageElement.innerHTML += `<p>МЕНЬШЕ!</p>`
    } else {
        messageElement.innerHTML += `<p>БОЛЬШЕ!</p>`
    }
}

recognition.addEventListener('result', speak)

recognition.addEventListener('end', () => {
    if (playable) recognition.start()
})

document.body.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        location.reload()
    }
})
