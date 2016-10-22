import graph from '../modules/graph.js'
import viewer from '../modules/mode.js'

;((w, d, undefined) => {

  'use strict'

  function flippy () {
    const _book = {} // Book object.

    // Initialize 
    _book.init = function (settings = { duration: 500, animation: true, curl: true, allowZoom: false }) {
      initializeBook(settings)

      return
    }

    _book.mode = viewer.getMatch('all and (min-width: 870px)') ? 'double' : 'single'

    viewer.onChange('all and (min-width: 870px)', function (match) {
      _book.mode = match ? 'double' : 'single'

      console.log(Book)
    })

    // Unimplemented API methods
    _book.version = '0.0.1'

    _book.mode = 'double'

    _book.turning = 'true/false'

    _book.turned = 'true/false' // 

    _book.zooming = 'true/false' // boolean state

    _book.zoomed = 'true/false' // boolean state

    _book.page_number = 1

    _book.page = function () {
      return 'page_number'
    }

    _book.view = function () {
      return 'view_array'
    }

    _book.size = function () {
      return '[height, width]'
    }

    _book.direction = 'forward'

    _book.next = function () {
      _book.direction = 'forward'
      return _book.direction
    }

    _book.prev = function () {
      _book.direction = 'backward'
      return _book.direction
    }

    _book.hasPage = function (pageNo) {
      console.log('Returns if page exist: ', pageNo)
    }

    _book.addPage = function (pageNo, content) {
      console.log('Adding page number: ', content, 'at', pageNo)
    }

    _book.removePage = function (pageNo) {
      console.log('Remove page number: ', pageNo)
    }

    /********* Private methods ********/

    function initializeBook (settings, page_number) {
      let node = d.getElementById('book')

      // Scoop up pages and buttons here.
      let nodes = [...node.children]

      _book.buttons = nodes.splice(0, 2)

      _book.pages = nodes.map(obj => {
        return wrapPage(obj)
      })

      function wrapPage (pageObj) {
        // Wrapper function here.
        return pageObj
      }

      removeChildren(node)

      function removeChildren (node) {
        while (node.hasChildNodes())
        node.removeChild(node.lastChild)
      }

      _book.length = _book.pages.length
    }

    return _book
  }

  /******* Private methods *******/

  let π = Math.PI

  // Put the _book object in global namespace.
  if (typeof w.Book === 'undefined') {
    w.Book = flippy()
  }
})(window, document)
