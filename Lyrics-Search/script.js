const form = document.querySelector('form')
const search = document.querySelector('input[type="text"]')
const result = document.querySelector('.result')
const more = document.querySelector('.more')

const url = 'https://api.lyrics.ovh'

async function searchSongs(text) {
    const response = await fetch(`${url}/suggest/${text}`)
    const data = await response.json()

    showData(data)
}

function showData(data) {
    result.innerHTML = `
        <ul>
            ${data.data.map(song => `<li><p>${song.artist.name} - ${song.title}</p><button data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button></li>`).join('')}
        </ul>
    `

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button onclick="getMore('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button onclick="getMore('${data.next}')">Next</button>` : ''}
        `
    } else more.innerHTML = ''
}

async function getMore(url) {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()

    showData(data)
}

async function getLyrics(artist, song) {
    const response = await fetch(`${url}/v1/${artist}/${song}`)
    const data = await response.json()

    if (data.error) {
        result.innerHTML = data.error
    } else {
        const lyrics = data.lyrics
            .replace(/\r{2,}|\n{2,}/g, '\n')
            .replace(/\r\n|\r|\n/g, '<br>')

        result.innerHTML = `<h3>${artist} - ${song}</h3><p>${lyrics}<p>`
    }

    more.innerHTML = ''
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const text = search.value.trim()

    if (!text) {
        return
    } else searchSongs(text)
})

result.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const artist = e.target.dataset.artist
        const song = e.target.dataset.song

        getLyrics(artist, song)
    }
})
