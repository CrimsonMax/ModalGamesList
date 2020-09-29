let fruits = [
    { id: 1, title: 'Apple', price: 20, img: 'img/apples.jpg' },
    { id: 2, title: 'Orange', price: 30, img: 'img/oranges.jpg' },
    { id: 3, title: 'Lemon', price: 40, img: 'img/lemons.jpg' },
    { id: 4, title: 'Apple', price: 20, img: 'img/apples.jpg' },
    { id: 5, title: 'Orange', price: 30, img: 'img/oranges.jpg' },
    { id: 6, title: 'Lemon', price: 40, img: 'img/lemons.jpg' },
    { id: 7, title: 'Apple', price: 20, img: 'img/apples.jpg' },
    { id: 8, title: 'Orange', price: 30, img: 'img/oranges.jpg' },
    { id: 9, title: 'Lemon', price: 40, img: 'img/lemons.jpg' },
]

const toHTML = fruit => `
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${fruit.img}" style="height: 200px;" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Cost',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

// const confirmModal = $.modal({
//     title: 'Are You sure?',
//     closable: true,
//     width: '400px',
//     footerButtons: [
//         {
//             text: 'Cancel', type: 'secondary', handler() {
//                 confirmModal.close()
//             }
//         },
//         {
//             text: 'Delete', type: 'danger', handler() {
//                 confirmModal.close()
//             }
//         }
//     ]
// })

// const modal = $.modal({
//     title: 'Max Modal',
//     closable: true,
//     content: `
//         <p>Lorem ipsum dolor sit.</p>
//         <p>Lorem ipsum dolor sit.</p>
//     `,
//     width: '400px',
//     footerButtons: [
//         {
//             text: 'Ok', type: 'primary', handler() {
//                 console.log('Primary btn clicked!')
//                 modal.close()
//             }
//         },
//         {
//             text: 'Cancel', type: 'danger', handler() {
//                 console.log('Danger btn clicked!')
//                 modal.close()
//             }
//         }
//     ]
// })

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
        <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)

        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are You sure?',
            content: `<p><strong>${fruit.title}</strong> will be deleted.</p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
        // confirmModal.setContent(`
        // <p><strong>${fruit.title}</strong> will be deleted.</p>
        // `)
        // confirmModal.open()
    }
})