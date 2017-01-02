import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'

document.addEventListener('DOMContentLoaded', function(event) {
    /**********************************/
    /** **** Initialize  Flippy ********/
    /**********************************/
    let settings = { duration: 100, animation: true, curl: true, peel: true, zoom: false, start_page: 2 }

    let node = document.getElementById('book')

    const superbook = Flippy.init(node, settings)

    /**********************************/
    /** ****** Work in progress ********/
    /**********************************/

    // superbook.flipping = false

    // superbook.flipped = true // Custom event?

    // superbook.zooming = false // boolean state

    // superbook.zoomed = true // boolean state

    // superbook.page = () => 'current_page'

    // superbook.area = () => '[height, width]'

    // superbook.direction = 'forward'

    // superbook.next = () => {
    //     superbook.direction = 'forward'
    //     return superbook.direction
    // }

    // superbook.prev = () => {
    //     superbook.direction = 'backward'
    //     return superbook.direction
    // }

    // superbook.addPage = (pageNo, content) => {
    //     console.log('Adding page number: ', content, 'at', pageNo)
    // }


    /**********************************/
    /******** Implemented  API ********/
    /**********************************/

    // PROPERTIES:

    let booklength = superbook.flippy('length')

    console.log('Book length', booklength)

    let currentPage = superbook.flippy('page')

    console.log('Current page', currentPage)

    let view = superbook.flippy('view')

    console.log('Current view', view)

    let mode = superbook.flippy('mode')

    console.log('Mode', mode)

    let area = superbook.flippy('area')

    // METHODS:

    superbook.flippy('page', 2)

    console.log(superbook.flippy('page')) // Logs the current page of the book

    console.log(superbook.flippy('hasPage', 18)) // Logs true / false if the book has a page at pageNo.


    // superbook.flippy('addPage', pageObj, 6)

    superbook.flippy('removePage', 10)



    // THE BOOK
    // console.log(superbook)


})

/************ Z' END **************/
