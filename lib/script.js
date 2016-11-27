import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'


document.addEventListener('DOMContentLoaded', function(event) {

    let settings = { duration: 100, animation: true, curl: true, allowZoom: false, start_page: 20 }

    let node = document.getElementById('book');

    const superbook = Flippy.init(node, settings);

    // superbook.flippy('pages');

    // superbook.flippy('flip', 'pages')

    console.log(superbook.flippy('length'));

    console.table(superbook);





}, true)
