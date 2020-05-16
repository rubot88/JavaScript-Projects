let textarea = document.querySelector('textarea')
let dateInput = document.querySelector('input[type="date"]')

let list = document.createElement('div')
list.classList.add('list')
document.body.appendChild(list)

// create database
let db;
(async () => {
    db = await idb.openDb('db', 1, db => {
        db.createObjectStore('notes', {
            keyPath: 'id'
        })
    })

    createList()
})();

// create list
let id
const createList = async () => {
    list.innerHTML = `<h3>Today is ${new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format()}</h3>`

    let notes = await db.transaction('notes')
        .objectStore('notes')
        .getAll()

    let dates = []

    if (notes.length) {
        id = notes.length

        notes.map(note => {
            list.insertAdjacentHTML('beforeend', `<div class = "note" data-id="${note.id}">
            <span class="notify ${note.notifyDate}">${note.notifyDate}</span>
            <span class="info ${note.notifyDate}">?</span>
            <span class="complete">V</span>
            <p class="${note.completed}">Text: ${note.text}, <br> created: ${note.createdDate}</p>
            <span class="delete">X</span>
        </div>`)
            if (note.notifyDate === null) {
                return
            } else {
                dates.push({
                    id: note.id,
                    date: note.notifyDate.replace(/(\d+)-(\d+)-(\d+)/, '$3.$2.$1')
                })
            }
        })
    } else {
        id = 0

        list.insertAdjacentHTML('beforeend', '<p class="note">empty</p>')
    }

    document.querySelectorAll('.note').forEach(note => note.addEventListener('click', event => {
        if (event.target.classList.contains('complete')) {
            event.target.nextElementSibling.classList.toggle('line-through')

            note.querySelector('p').classList.contains('line-through') ?
                notes[note.dataset.id].completed = 'line-through' :
                notes[note.dataset.id].completed = ''

            db.transaction('notes', 'readwrite')
                .objectStore('notes')
                .put(notes[note.dataset.id])
        } else if (event.target.classList.contains('delete')) {
            deleteNote(+note.dataset.id)
        } else if (event.target.classList.contains('info')) {
            event.target.previousElementSibling.classList.toggle('show')
        }
    }))

    checkDeadline(dates)
}

// add note
const addNote = async () => {
    if (textarea.value === '') return

    let text = textarea.value
    let date

    dateInput.value === '' ? date = null : date = dateInput.value

    let note = {
        id: id,
        text: text,
        createdDate: new Date().toLocaleDateString(),
        completed: '',
        notifyDate: date
    }

    try {
        await db.transaction('notes', 'readwrite')
            .objectStore('notes')
            .add(note)
        await createList()
            .then(() => {
                textarea.value = ''
                dateInput.value = ''
            })
    } catch {}
}

const deleteNote = async key => {
    await db.transaction('notes', 'readwrite')
        .objectStore('notes')
        .delete(key)
    await createList()
}

document.querySelector('.add-btn').onclick = addNote

// clear storage
document.querySelector('.clear-btn').onclick = async () => {
    await db.transaction('notes', 'readwrite')
        .objectStore('notes')
        .clear()

    await createList()
}

/*// delete database
document.querySelector('.delete-btn').onclick = async () => {
    await idb.deleteDb('dataBase')
        .then(location.reload())
}*/

// check deadline
const checkDeadline = async dates => {
    let today = `${new Date().toLocaleDateString()}`

    dates.forEach(date => {
        if (date.date === today) {
            document.querySelector(`div[data-id="${date.id}"] .info`).textContent = '!'
        }
    })
}

// handle errors
window.addEventListener('unhandledrejection', event => {
    console.error('error: ' + event.reason.message)
})
