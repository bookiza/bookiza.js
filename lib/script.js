import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'



document.addEventListener('DOMContentLoaded', function(event) {

    /**********************************/
    /****** Initialize  Flippy ********/
    /**********************************/

    let settings = { duration: 100, animation: true, curl: true, peel: true, zoom: false, start_page: 2 }

    let node = document.getElementById('book')

    const superbook = Flippy.init(node, settings)

    /**********************************/
    /******** Work in progress ********/
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

    // superbook.hasPage = pageNo => {
    //     console.log('Returns if page exist: ', pageNo)
    // }

    // superbook.addPage = (pageNo, content) => {
    //     console.log('Adding page number: ', content, 'at', pageNo)
    // }

    // superbook.removePage = pageNo => {
    //     console.log('Remove page number: ', pageNo)
    // }

    /**********************************/
    /******** Implemented  API ********/
    /**********************************/


    // PROPERTIES:

    let booklength = superbook.flippy('length')
    console.log('Book length', booklength)

    let view = superbook.flippy('view')
    console.log('Current view', view)

    // superbook.flippy('flip', 7)



})


/***********Z' END **************/
