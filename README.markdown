[![Build Status](https://travis-ci.org/marvindanig/Bookiza.JS.svg?branch=master)](https://travis-ci.org/marvindanig/Bookiza.JS)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/dt/Bookiza.JS.svg?maxAge=2592000)](https://www.npmjs.com/package/Bookiza)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/bookiza/bookiza.js/pulls)

# Bookiza.JS

A leafy responsive alternative to Turnjs. No jQuery dependency along with a no javascript fallback.

## API

In your HTML:

```html
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

```javascript
// document.addEventListener('DOMContentLoaded', function(event) {
/**********************************/
/** **** Initialize Bookiza ********/
/**********************************/
let settings = { duration: 100, animation: true, curl: true, peel: true, zoom: false, start_page: 16 }

let node = document.getElementById('book')

const superbook = Bookiza.init(node, settings)

/**********************************/
/** ****** Work in progress ********/
/**********************************/

// superbook.flipping = false

// superbook.flipped = true // Custom event?

// superbook.zooming = false // boolean state

// superbook.zoomed = true // boolean state

// superbook.Bookiza('next')

// superbook.Bookiza('previous')

/**********************************/
/******** Implemented  API ********/
/**********************************/

// // PROPERTIES:

let booklength = superbook.Bookiza('length')

console.log('Book length:', booklength)

let currentPage = superbook.Bookiza('page')

console.log('Current page:', currentPage)

let view = superbook.Bookiza('view')

console.log('Current view:', view)

let mode = superbook.Bookiza('mode')

console.log('Mode:', mode)

let dimensions = superbook.Bookiza('dimensions') // Returns object: { width: bookWidthInPixels, height: bookHeightInPixels }

console.log('Dimensions:', dimensions)


// // METHODS:

superbook.Bookiza('page', 5)

console.log(superbook.Bookiza('page')) // Logs the current page of the book

console.log(superbook.Bookiza('view')) // Logs the current view of the book

console.log(superbook.Bookiza('hasPage', 18)) // Logs true / false if the book has a page at pageNo.

superbook.Bookiza('removePage', 3) // Removes the page number 3 from the stack. Lowers the length of the book by 1.

let pageObj = document.createElement('div')

pageObj.innerHTML = 'something something'

superbook.Bookiza('addPage', pageObj, 3)

// // THE BOOK
// console.log(superbook)


// }, true)

/************ Z' END **************/
```
