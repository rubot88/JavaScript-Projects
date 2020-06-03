let products = [
    {
        id: 1,
        title: 'Product1',
        price: 10,
        img: 'https://placeimg.com/640/480/tech'
    },
    {
        id: 2,
        title: 'Product2',
        price: 20,
        img: 'https://placeimg.com/640/480/tech'
    },
    {
        id: 3,
        title: 'Product3',
        price: 30,
        img: 'https://placeimg.com/640/480/tech'
    },
]

const toHTML = product => `
<div class="col">
    <div class="card">
        <img src="${product.img} alt="${product.title}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${product.id}">Show</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${product.id}">Delete</a>
        </div>
    </div>
</div>
`

function render() {
    document.querySelector('#products').innerHTML = products.map(toHTML).join('')
}
render()

const modal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close',
            type: 'danger',
            handler() {
                modal.close()
            }
        }
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    let btnType = event.target.dataset.btn
    let id = +event.target.dataset.id
    let product = products.find(p => p.id === id)

    if (btnType === 'price') {
        modal.setContent(`
    <p>Title: ${product.title} <br> Price: ${product.price}</p>
`)
        modal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Sure?',
            content: `<p>${product.title}</p>`
        }).then(() => {
            products = products.filter(p => p.id !== id);
            render()
        }).catch(() => {
            return
        })
    }
})
