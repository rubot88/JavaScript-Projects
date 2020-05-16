const form = document.querySelector('form')
const name = document.querySelector('input[type="text"]')
const email = document.querySelector('input[type="email"]')
const password = document.querySelector('.password')
const password2 = document.querySelector('.password2')

function showError(input, msg) {
    const parent = input.parentElement
    parent.className = 'error'
    const error = parent.querySelector('.error-msg')
    error.textContent = msg
    error.style.display = 'block'

    const timer = setTimeout(() => {
        error.style.display = 'none'
        parent.className = ''
        clearTimeout(timer)
    }, 4000)
}

function showSuccess(input) {
    const parent = input.parentElement
    parent.className = 'success'
}

function checkEmail(input) {
    const regex = /^\S+@\S+\.\S+$/

    regex.test(input.value.trim()) ?
        showSuccess(input) :
        showError(input, `Email isn't valid`)
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        input.value.trim() === '' ?
            showError(input, `${getFieldName(input)} is required`) :
            showSuccess(input)
    })
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

function checkPasswordsMatch(input, input2) {
    if (input.value !== input2.value) showError(input2, `Passwords don't match`)
}

function getFieldName(input) {
    return input.previousElementSibling.textContent
}

form.addEventListener('submit', e => {
    e.preventDefault()

    checkRequired([email, password2])
    checkLength(name, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})
