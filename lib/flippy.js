import viewer from '../modules/mode.js'

import graph from '../modules/graph.js'

;((w, d, undefined) => {
  function flippy () {
    const _book = {} // Expose book to DOM.

    /********* *************** ********/
    /*********** Public API ***********/
    /********* *************** ********/

    _book.flippy = 'VERSION::0.0.1' // Pick up from SEMVER?

    // Initialize book
    _book.init = (settings = { duration: 500, animation: true, curl: true, allowZoom: false }) => {
      _book.settings = settings

      let current_page = parseInt(_book.settings.start_page) || 1

      initializeBook(_book.settings, current_page)
      return
    }

    _book.mode = viewer.getMatch('all and (min-width: 870px)') ? 'single' : 'double'

    viewer.onChange('all and (min-width: 870px)', match => {
      _book.mode = match ? 'double' : 'single'
    // initializeBook(settings, current_page)
    })

    // Unimplemented API methods

    _book.turning = 'true/false'

    _book.turned = 'true/false' // 

    _book.zooming = 'true/false' // boolean state

    _book.zoomed = 'true/false' // boolean state

    _book.page = () => 'current_page'

    _book.size = () => '[height, width]'

    _book.direction = 'forward'

    _book.next = () => {
      _book.direction = 'forward'
      return _book.direction
    }

    _book.prev = () => {
      _book.direction = 'backward'
      return _book.direction
    }

    _book.hasPage = pageNo => {
      console.log('Returns if page exist: ', pageNo)
    }

    _book.addPage = (pageNo, content) => {
      console.log('Adding page number: ', content, 'at', pageNo)
    }

    _book.removePage = pageNo => {
      console.log('Remove page number: ', pageNo)
    }

    /********* *************** ********/
    /********* Private methods ********/
    /********* *************** ********/

    function initializeBook (settings, current_page = 1) {
      const node = d.getElementById('book')

      let nodes = [...node.children] // Scoop up pages and buttons here.

      _book.buttons = nodes.splice(0, 2)

      _book.pages = nodes.map(page => {
        return wrapPage(page)
      })

      removeChildren(node) // Clean slate

      _book.length = _book.pages.length // Check if _book.length = Even number >= 4. 

      printButtons(node) // Custom events anyone! :-)

      estimatePages(current_page)

      printPages(node)
    }

    function removeChildren (node) {
      while (node.hasChildNodes())
      node.removeChild(node.lastChild)
    }

    function printButtons (node) {
      for (let i = 0; i < 2; i++) {
        node.appendChild(_book.buttons[i])
      }
    }

    function estimatePages (current_page) {
      switch (_book.mode) {
        case 'single':

          _book.range = _book.pages.slice(current_page - 2, current_page) // Array indices start at 0.
          _book.view = [current_page - 1]

          console.log('VIEW', _book.view)
          console.log('mode', _book.mode)
          break

        case 'double':
          if (isEven(parseInt(current_page))) { _book.view = [parseInt(current_page), parseInt(current_page + 1)] }
          if (isOdd(parseInt(current_page))) { _book.view = [parseInt(current_page - 1), parseInt(current_page)] }

          console.log('mode', _book.mode)
          console.log('VIEW', _book.view)

          _book.range = _book.pages.slice(parseInt(_book.view[0]) - 1, parseInt(_book.view[1])) // Array indices start at 0.

          break

      }
    }

    function printPages (node) {
      const docfrag = document.createDocumentFragment()

      const pageList = _book.range // Rename to range

      console.log('Number of pages in renderTree', _book.range.length)

      pageList.forEach(page => {
        docfrag.appendChild(page)
      })

      node.appendChild(docfrag)
    }

    /********* *************** ********/
    /********* Helper methods *********/
    /********* *************** ********/

    function wrapPage (pageObj) {
      // Wrapper function here.
      return pageObj
    }

    function isEven (n) {
      return n === parseFloat(n) ? !(n % 2) : void 0
    }

    function isOdd (n) {
      return Math.abs(n % 2) == 1
    }

    function applyStyles () {
      // Do something here.
    }

    // insertBefore
    function insertAfter (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    /********* *************** ********/
    /************ Cone Maths **********/
    /********* *************** ********/

    let π = Math.PI

    return _book
  }

  // Putting the Book object in global namespace.
  if (typeof w.Book === 'undefined') {
    w.Book = flippy()
  }
})(window, document)
