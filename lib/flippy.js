import viewer from '../modules/mode.js'

import graph from '../modules/graph.js'

;((w, d, undefined) => {
  function flippy () {
    const _book = {} // Book object.

    // Initialize book
    _book.init = (settings = { duration: 500, animation: true, curl: true, allowZoom: false }) => {
      initializeBook(settings)
      return
    }

    _book.mode = viewer.getMatch('all and (min-width: 870px)') ? 'double' : 'single'

    viewer.onChange('all and (min-width: 870px)', match => {
      _book.mode = match ? 'double' : 'single'
    })

    _book.flippy = 'VERSION::0.0.1' // Pick up from SEMVER.

    // Unimplemented API methods

    _book.turning = 'true/false'

    _book.turned = 'true/false' // 

    _book.zooming = 'true/false' // boolean state

    _book.zoomed = 'true/false' // boolean state

    _book.page = () => 'page_number'

    _book.view = () => 'view_array'

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

    function initializeBook (settings, page_number = 1) {
      const node = d.getElementById('book')

      // Scooping up pages and buttons here.
      let nodes = [...node.children]

      _book.buttons = nodes.splice(0, 2)

      // Arrays? or nodeList: that is the question.
      _book.pages = nodes.map(obj => {
        return wrapPage(obj)
      })

      removeChildren(node) // Clean slate

      _book.length = _book.pages.length // Check if _book.length = Even number >= 4. 

      printButtons(node) // Custom events anyone! :-)

      printPages(node)
    }

    function wrapPage (pageObj) {
      // Wrapper function here.
      return pageObj
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

    function estimatePages () {
      // Do something here.
    }

    function applyStyles () {
      // Do something here.
    }

    // insertBefore
    function insertAfter (newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    function printPages (node) {
      const docfrag = document.createDocumentFragment()

      const pageList = _book.pages.slice(0, 5)

      pageList.forEach(e => {
        docfrag.appendChild(e)
      })

      node.appendChild(docfrag)
    }

    let π = Math.PI

    return _book
  }

  // Putting the Book object in global namespace.
  if (typeof w.Book === 'undefined') {
    w.Book = flippy()
  }
})(window, document)
