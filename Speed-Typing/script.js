const word = document.querySelector('.word')
const input = document.querySelector('input')
const scoreEl = document.querySelector('.score')
const timeEl = document.querySelector('.time')
const mainEl = document.querySelector('.main-box')
const gameOverEl = document.querySelector('.game-over')
const difficultyEl = document.querySelector('select')

const words = [
    'звукорежиссер',
    'птицефабрика',
    'лесозаготовки',
    'хлебозавод',
    'газобаллон',
    'теплоотдача',
    'кораблекрушение',
    'кинотеатр',
    'формотворчество',
    'нефтепромышленность',
    'мировоззрение',
    'овощехранилище',
    'пассажиропоток',
    'жирозаменитель',
    'сухофрукты',
    'быстродействие',
    'первоисточник',
    'главнокомандующий'
]

let randomWord

let score = 0

let time = 10

let difficulty =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium'

difficultyEl.value =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium'

input.focus()

const timer = setInterval(updateTime, 1000)

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDOM() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

function updateScore() {
    score++
    scoreEl.innerHTML = score
}

function updateTime() {
    time--
    timeEl.textContent = time + ' c'

    if (time === 0) {
        clearInterval(timer)

        gameOver()
    }
}

function gameOver() {
    gameOverEl.innerHTML = `
<h3>Время вышло!</h3>
<p>Ваш результат: ${score}</p>
<button onclick="location.reload()">Заново</button>
`
    mainEl.style.display = 'none'
    gameOverEl.style.display = 'block'
}

addWordToDOM()

input.addEventListener('input', () => {
    const text = input.value

    if (text === randomWord) {
        addWordToDOM()
        updateScore()

        input.value = ''

        if (difficulty === 'hard') {
            time += 2
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 5
        }

        updateTime()
    }
})

difficultyEl.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})
