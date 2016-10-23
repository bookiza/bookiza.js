import '../css/book.css'

import 'babel-polyfill'

import '../lib/flippy.js'

let settings = {
  duration: 100,
  animation: true,
  curl: true,
  allowZoom: false
}

Book.init(settings)

console.log(Book.length)

/********** Useless ********/

// Book.init(settings) // Optionally initialize to a page_number.

// let content = '<div> Hello world</div>'

// Book.addPage(4, content)

// console.log(Book.version)

// console.log(Book.view())

// console.log(Book.next())

// console.log(Book.prev())

// Book.removePage(3)
