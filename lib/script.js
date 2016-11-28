import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'

document.addEventListener('DOMContentLoaded', function(event) {

    /**********************************/
    /****** Initialize  Flippy ********/
    /**********************************/

    let settings = { duration: 100, animation: true, curl: true, allowZoom: false, start_page: 20 }

    let node = document.getElementById('book')

    const superbook = Flippy.init(node, settings)

    console.table(superbook)

    /**********************************/
    /******** Work in progress ********/
    /**********************************/

    // superbook.flippy('flip', 7)

    // superbook.flip = (current_page = 1) => { console.log(current_page) }

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

    let booklength = superbook.flippy('length')

    console.log(booklength)

}, true)
