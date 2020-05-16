const form = document.querySelector('form')
const input = document.querySelector('input[type="text"]')
const button = document.querySelector('button')
const result = document.querySelector('.result')
const meals = document.querySelector('.meals')
const mealBox = document.querySelector('.meal')

function search(e) {
    e.preventDefault()

    mealBox.innerHTML = ''

    const text = input.value

    if (text.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
            .then(res => res.json())
            .then(data => {
                result.innerHTML = `<h3>${text}</h3>`

                if (data.meals === null) {
                    result.innerHTML = `<p>There's no such meal</p>`
                } else {
                    meals.innerHTML = data.meals
                        .map(meal => `
                        <figure data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <figcaption>${meal.strMeal}</figcaption>
                        </figure>
                    `).join('')
                }
            })
        input.value = ''
    } else return
}

function getMeal(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMeal(meal)
        })
}

function getRandom() {
    meals.innerHTML = ''
    result.innerHTML = ''

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            addMeal(meal)
        })
}

function addMeal(meal) {
    const ingredients = []

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else break;
    }

    mealBox.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        <p>${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `
}

form.addEventListener('submit', search)
button.addEventListener('click', getRandom)

meals.addEventListener('click', e => {
    if (e.target.parentElement.dataset.id) {
        const id = +e.target.parentElement.dataset.id

        getMeal(id)
    }
})
