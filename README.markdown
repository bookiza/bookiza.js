[![Build Status](https://travis-ci.org/marvindanig/flippy.JS.svg?branch=master)](https://travis-ci.org/marvindanig/flippy.JS) 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/dt/flippy.JS.svg?maxAge=2592000)](https://www.npmjs.com/package/flippy)

# flippy.JS

A leafy responsive alternative to Turnjs. No jQuery dependency. No javascript fallback.

## API

In your HTML:

```
  <div id = "book"> 
      <div class = "page"> Page-1 content here…</div>
      <div class = "page"> Page-2 content here…</div>
      <div class = "page"> Page-3 content here…</div>
      …
      …
      <div class = "page"> Page-2N content here…</div>
  </div>

```

Invocation with `script.js`:

```
import 'YOUR_APP/css/book.css'

import 'babel-polyfill'

import 'YOUR_APP/lib/flippy.js'

let settings = {
  duration: 100,
  animation: true,
  curl: true,
  allowZoom: false
}

Book.init(settings, 5)

Book.next()

Book.prev()

let content = '<div> Hello world</div>'

Book.addPage(4, content)

Book.removePage(4)

console.log(Book.flippy) // Outputs version of the library.

console.log(Book.edition)

Book.view() // Outputs the pages in view of the reader

Book.stack() // Outputs the pages in the render tree.


```