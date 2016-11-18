import 'babel-polyfill'

import '../css/book.css'

import '../lib/flippy.js'

let settings = {
  duration: 100,
  animation: true,
  curl: true,
  allowZoom: false,
  start_page: 20
}

document.addEventListener('DOMContentLoaded', function (event) {
  Book.init(settings)

  // Book.flip(5) // Next public method 
  // console.table(Book)
}, true)

/********** Useless ********/

// Book.init(settings) // Optionally initialize to a page_number.

// let content = '<div> Hello world</div>'

// Book.addPage(4, content)

// console.log(Book.version)

// console.log(Book.view())

// console.log(Book.next())

// console.log(Book.prev())

// Book.removePage(3)
