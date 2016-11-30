[![Build Status](https://travis-ci.org/marvindanig/flippy.JS.svg?branch=master)](https://travis-ci.org/marvindanig/flippy.JS) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/dt/flippy.JS.svg?maxAge=2592000)](https://www.npmjs.com/package/flippy)

# flippy.JS

A leafy responsive alternative to Turnjs. No jQuery dependency along with a no javascript fallback.

## API

In your HTML:

```
  <div id = "book">
      <div class = "page"> Page-1 HTML </div>
      <div class = "page"> Page-2 HTML </div>
      <div class = "page"> Page-3 HTML </div>
      …
      …
      <div class = "page"> Page-2N content here…</div>
  </div>

```
Note the `2N` number of `pages` in the book because a `leaf` has two sides to it.

Invocation with `script.js`:

```
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

    console.log('Book length', booklength)

    superbook.flippy('flip', 7)


}, true)

```