import viewer from '../modules/mode.js'

import graph from '../modules/graph.js'

;((w, d, undefined) => {
  function flippy () {
    const _book = {} // Expose book to DOM.

    /********* *************** ********/
    /*********** Public API ***********/
    /********* *************** ********/

    _book.flippy = 'VERSION::0.0.1' // Pick up from SEMVER?

    // One time initialization.
    _book.init = (settings = { duration: 500, animation: true, curl: true, allowZoom: false }) => oneTimeInit(settings) 

    viewer.onChange('(orientation: landscape)', match => {
      _book.mode = match ? 'double' : 'single'

      initializeBook(_book.settings, _book.settings.start_page)
    })

    // Unimplemented API methods

    _book.flip = (current_page = 1) => { console.log(current_page) }

    _book.flipping = 'true/false'

    _book.flipped = 'true/false' // 

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

    function oneTimeInit (settings) {
      const node = d.getElementById('book')

      let nodes = [...node.children] // Scoop up pages and buttons here.

      _book.buttons = nodes.splice(0, 2)

      _book.pages = nodes.map((page, index) => {
        return addBaseClasses(page, index)
      })

      _book.thickness = _book.pages.length // Check if _book.length is even

      removeChildren(node) // Clean slate    

      _book.mode = viewer.getMatch('(orientation: landscape)') ? 'double' : 'single'

      _book.settings = settings

      initializeBook(_book.settings, _book.settings.start_page)
    }

    function initializeBook (settings, current_page = 1) {
      const node = d.getElementById('book')

      removeChildren(node)

      printButtons(node) // Custom events anyone! :-)

      estimateViewAndRange(current_page)

      printPages(node)
    }

    function removeChildren (node) {
      node.innerHTML = '' // performant?
    // while (node.hasChildNodes())         
    // node.removeChild(node.lastChild)
    }

    function printButtons (node) {
      for (let i = 0; i < 2; i++) {
        node.appendChild(_book.buttons[i])
      }
    }

    function estimateViewAndRange(current_page) {
      switch (_book.mode) {
        case 'single':

          _book.view = [parseInt(current_page - 1)]
          _book.range = _book.pages.slice(parseInt(_book.view[0]) - 2, parseInt(_book.view[0]) + 1) // Array indices start at 0.
          
          break

        case 'double':
          if (isEven(parseInt(current_page))) { _book.view = [parseInt(current_page), parseInt(current_page + 1)] }
          if (isOdd(parseInt(current_page))) { _book.view = [parseInt(current_page - 1), parseInt(current_page)] }

          _book.range = _book.pages.slice(parseInt(_book.view[0]) - 3, parseInt(_book.view[1]) + 2) // Array indices start at 0.
          
          break

      }
    }

    function printPages (node) {
      const docfrag = document.createDocumentFragment()

      const pageList = _book.range.map((page, index) => {
        let classes = isEven(index) ? 'left' : 'right'
        return applyStyles(page, classes)
      })

      // console.log('Number of pages in renderTree', _book.range.length)

      pageList.forEach(page => {
        docfrag.appendChild(page)
      })

      node.appendChild(docfrag) // To DOM. Use insertBefore?
    }

    /********* *************** ********/
    /********* Helper methods *********/
    /********* *************** ********/

    function addBaseClasses(pageObj, index) {
      pageObj.classList.add(`page-${parseInt(index) + 1}`)
      if (isEven(index)) pageObj.classList.add('page-even')
      if (isOdd(index)) pageObj.classList.add('page-odd')
    
      // let wrappedHtml = wrapHtml(pageObj)

      return pageObj // wrappedHtml
    }

    function wrapHtml(pageObj) {
      // May be required.
      const newWrapper = document.createElement('div');
      
      newWrapper.setAttribute('style', 'float:left;')
      newWrapper.classList.add('page')  
      newWrapper.appendChild(pageObj);
      return newWrapper
    }


    function isEven (n) {
      return n === parseFloat(n) ? !(n % 2) : void 0
    }

    function isOdd (n) {
      return Math.abs(n % 2) == 1
    }

    function applyStyles (pageObj, classes) {
      switch (_book.mode) {
        case 'single':
          if (pageObj.classList.contains('left')) pageObj.classList.remove('left') // Inline style?
          if (pageObj.classList.contains('right')) pageObj.classList.remove('right')

          break
        case 'double':
          if (!pageObj.classList.contains(classes)) pageObj.classList.add(classes)
          break
      }
      return pageObj
    }

    // insertBefore?
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
