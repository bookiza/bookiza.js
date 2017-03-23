// document.addEventListener('DOMContentLoaded', function(event) {
/**********************************/
/** **** Initialize  Flippy ********/
/**********************************/
let settings = { duration: 100, animation: true, curl: true, peel: true, zoom: false, start_page: 16 }

let node = document.getElementById('book')

const superbook = Flippy.init(node, settings)

/**********************************/
/** ****** Work in progress ********/
/**********************************/

// superbook.flipping = false

// superbook.flipped = true // Custom event?

// superbook.zooming = false // boolean state

// superbook.zoomed = true // boolean state

// superbook.flippy('next')

// superbook.flippy('previous')

/**********************************/
/******** Implemented  API ********/
/**********************************/

// // PROPERTIES:

// let booklength = superbook.flippy('length')

// console.log('Book length', booklength)

// let currentPage = superbook.flippy('page')

// console.log('Current page', currentPage)

// let view = superbook.flippy('view')

// console.log('Current view', view)

// let mode = superbook.flippy('mode')

// console.log('Mode', mode)

let dimensions = superbook.flippy('dimensions') // Returns object: { width: bookWidthInPixels, height: bookHeightInPixels }

console.log('dimensions', dimensions)


// // METHODS:

// superbook.flippy('page', 5)

// console.log(superbook.flippy('page')) // Logs the current page of the book

// console.log(superbook.flippy('view')) // Logs the current view of the book

// console.log(superbook.flippy('hasPage', 18)) // Logs true / false if the book has a page at pageNo.

// superbook.flippy('removePage', 3) // Removes the page number 3 from the stack. Lowers the length of the book by 1.

// let pageObj = document.createElement('div')

// pageObj.innerHTML = 'something something'

// superbook.flippy('addPage', pageObj, 3)

// // THE BOOK
// console.log(superbook)


// }, true)

/************ Z' END **************/
