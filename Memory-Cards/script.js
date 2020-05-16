const cardsBox = document.querySelector('.cards')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const showBtn = document.querySelector('.show')
const closeBtn = document.querySelector('.close')
const current = document.querySelector('.current')
const question = document.querySelector('#question')
const answer = document.querySelector('#answer')
const addBtn = document.querySelector('.add')
const clearBtn = document.querySelector('.clear')
const form = document.querySelector('form')

let currentCard = 0

const cardsArr = []

const cardsData = JSON.parse(localStorage.getItem('cards')) || []

cardsData.forEach((data, i) => createCard(data, i))

function createCard(data, i) {
    const card = document.createElement('div')
    card.classList.add('card')
    
    if(i === 0) {
        card.classList.add('active')
    }
    
    card.innerHTML = `
    <div class="inner">
      <div class="front">
        <p>
          ${data.q}
        </p>
      </div>
      <div class="back">
        <p>
          ${data.a}
        </p>
      </div>
    </div>
`
    card.addEventListener('click', () => card.classList.toggle('swap'))
    
    cardsArr.push(card)
    
    cardsBox.appendChild(card)
    
    updateText()
}

function updateText() {
    current.textContent = `${currentCard + 1}/${cardsArr.length}`
}

nextBtn.addEventListener('click', () => {
    cardsArr[currentCard].className = 'card left'
    
    currentCard = currentCard + 1
    
    if(currentCard > cardsArr.length - 1) currentCard = cardsArr.length - 1
    
    cardsArr[currentCard].className = 'card active'
    
    updateText()
})

prevBtn.addEventListener('click', () => {
    cardsArr[currentCard].className = 'card right'
    
    currentCard = currentCard - 1
    
    if(currentCard < 0) {
        currentCard = 0
    }
    
    cardsArr[currentCard].className = 'card active'
    
    updateText()
})

showBtn.addEventListener('click', () => form.classList.add('show'))

closeBtn.addEventListener('click', () => form.classList.remove('show'))

addBtn.addEventListener('click', () => {
    const q = question.value
    const a = answer.value
    
    if(q.trim() && a.trim()){
        const c = { q, a }
        
        createCard(c)
        
        question.value = ''
        answer.value = ''
        
        form.classList.remove('show')
        
        cardsData.push(c)
        
        localStorage.setItem('cards', JSON.stringify(cardsData))
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardsBox.innerHTML = ''
    location.reload()
})