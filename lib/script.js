import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'


document.addEventListener('DOMContentLoaded', function(event) {

    /**********************************/
    /****** Initialize  Flippy ********/
    /**********************************/


    let settings = { duration: 100, animation: true, curl: true, allowZoom: false, start_page: 20 }

    let node = document.getElementById('book');

    const superbook = Flippy.init(node, settings);

    console.table(superbook);


    /**********************************/
    /******** Work in progress ********/
    /**********************************/


    // superbook.flippy('flip', 'pages')






    /**********************************/
    /******** Implemented  API ********/
    /**********************************/


    let booklength = superbook.flippy('length'))

    console.log(booklength)

    /******************************/


}, true)
