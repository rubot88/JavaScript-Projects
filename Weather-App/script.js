let long
let lat

let tempDesc = document.querySelector('.temperature-description')
let tempDeg = document.querySelector('.temperature-degree')
let locTime = document.querySelector('.location-timezone')
let tempSec = document.querySelector('.temperature-section')
let tempSpan = document.querySelector('.temperature-section span')

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
        long = pos.coords.longitude
        lat = pos.coords.latitude

        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`

        fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const {
                    temperature,
                    summary,
                    icon
                } = data.currently

                tempDeg.textContent = temperature.toFixed()
                tempDesc.textContent = summary
                locTime.textContent = data.timezone

                let celsius = Math.floor((temperature - 32) * (5 / 9))

                setIcons(icon, document.querySelector('canvas'))
                tempSec.addEventListener('click', () => {
                    if (tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C'
                        tempDeg.textContent = celsius
                    } else {
                        tempSpan.textContent = 'F'
                        tempDeg.textContent = temperature.toFixed()
                    }
                })
            })
    })
} else console.log('error')

function setIcons(icon, iconID) {
    const skycons = new Skycons({
        color: '#fff'
    })
    const curIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[curIcon])
}
