// Copyright Notice: All rights reserved. © 2016 - 2017 Marvin Danig
// FLIPPY VERSION::0.0.1'

// import viewer from '../modules/mode.js'
// import '../modules/graph.js'
// import events from '../modules/events.js'

(((n, w, d) => {
  /***********************************
  ************* Public API **********
  ***********************************/

  class Book {
    // book object class
    constructor () {
      this.mode = _viewer.getMatch('(orientation: landscape)') ? 'landscape' : 'portrait'
      this.plotter = {}

      // this.zoomed = false
      // this.flipped = true

      // this.state = ['flipping', 'calm', 'zoomed', 'peeling', 'peeled']
    }

    // PROPERTIES
    dimensions () {
      return JSON.parse(`{ "width" : "${_book.plotter.bounds.width}", "height" : "${_book.plotter.bounds.height}" }`)
    }

    view () {
      return _book.currentView
    }

    page () {
      return _book.currentPage
    }

    getLength () {
      return _book.pages.length
    }

    getMode () {
      return _book.mode
    }

    // METHODS
    flipPage (theArgs) {
      let index = parseInt(theArgs[0]) - 1
      if (index.between(0, _book.pages.length)) _flipPage(theArgs[0])
    }

    hasPage (theArgs) {
      let index = parseInt(theArgs[0]) - 1
      return !!index.between(0, _book.pages.length)
    }

    removePage (theArgs) {
      let index = parseInt(theArgs[0]) - 1
      if (index.between(0, _book.pages.length)) _removePage(index)
    }

    addPage (theArgs) {
      let index = parseInt(theArgs[1]) - 1
      if (index.between(0, _book.pages.length)) _addPage(theArgs[0], index)
    }

    // next() {
    //     _next(increment(_book.mode))
    // }

    // previous() {
    //     _previous(increment(_book.mode))
    // }

    // EVENTS
  }

  /***********************************
  ********** Private Methods *********
  ***********************************/

  let _viewer = {
    getMatch (query, usePolyfill) {
      return this.testMedia(query, usePolyfill).matches
    },

    onChange (query, cb, usePolyfill) {
      let res = this.testMedia(query, usePolyfill)

      res.addListener(changed => {
        cb.apply({}, [changed.matches, changed.media])
      })
    },

    testMedia (query, usePolyfill) {
      const isMatchMediaSupported = !!(w && w.matchMedia) && !usePolyfill

      if (isMatchMediaSupported) {
        const res = w.matchMedia(query)
        return res
      } else {
        // ... add polyfill here or use polyfill.io for IE8 and below 
      }
    }
  }

  let _book = new Book()

  function _init (node, settings = { speed: 500, animate: true, peel: true, zoom: true }) {
    _book.node = node

    _book.settings = settings

    let nodes = [..._book.node.children]

    _book.buttons = nodes.splice(0, 2)

    _book.pages = nodes.map((page, currentIndex) => {
      return _addBaseClasses(page, currentIndex)
    })

    _setUpGeometry()

    _removeChildren(_book.node)

    _book.currentPage = (settings.start_page === undefined) ? 1 : (parseInt(settings.start_page) > 0 && parseInt(settings.start_page) < parseInt(_book.pages.length)) ? parseInt(settings.start_page) % parseInt(_book.pages.length) : (parseInt(settings.start_page) % parseInt(_book.pages.length) === 0) ? parseInt(_book.pages.length) : parseInt(settings.start_page) < 0 ? parseInt(_book.pages.length) + 1 + parseInt(settings.start_page) % parseInt(_book.pages.length) : parseInt(settings.start_page) % parseInt(_book.pages.length)

    _setView(_book.currentPage)

    _setRange(_book.currentPage)

    _printBook()
  }

  //  Window level listeners.
  _viewer.onChange('(orientation: landscape)', match => {
    _book.mode = match ? 'landscape' : 'portrait'

    _removeChildren(_book.node)

    _setView(_book.currentPage)

    _setRange(_book.currentPage)

    _printBook()
  })

  w.addEventListener('resize', _setUpGeometry)

  function _setUpGeometry () {
    _book.plotter.bounds = _book.node.getBoundingClientRect() // The premise.
    _book.plotter.origin = JSON.parse(`{ "x": "${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().width) / 2}", "y": "${parseInt(d.getElementsByTagName('body')[0].getBoundingClientRect().height) / 2}" }`)

    d.getElementById('pwidth').textContent = _book.plotter.bounds.width
    d.getElementById('pheight').textContent = _book.plotter.bounds.height
    d.getElementById('ptop').textContent = _book.plotter.bounds.top
    d.getElementById('pleft').textContent = _book.plotter.bounds.left
    d.getElementById('pright').textContent = _book.plotter.bounds.right
    d.getElementById('pbottom').textContent = _book.plotter.bounds.bottom
    d.getElementById('originX').textContent = _book.plotter.origin.x
    d.getElementById('originY').textContent = _book.plotter.origin.y
  }

  function _removeChildren (node) {
    node.innerHTML = ''
  }

  function _removePage (index) {
    _book.pages.splice(index, 1)

    _setView(_book.currentPage)

    _setRange(_book.currentPage)

    _printBook()
  }

  function _addPage (pageObj, index) {
    let wrappedObj = _addBaseClasses(pageObj, index)

    _book.pages.splice(index, 0, wrappedObj)

    _setView(_book.currentPage)

    _setRange(_book.currentPage)

    _printBook()
  }

  function _addBaseClasses (pageObj, currentIndex) {
    let classes = `promoted inner page-${parseInt(currentIndex) + 1} `

    classes += isEven(currentIndex) ? 'odd' : 'even'

    addClasses(pageObj, classes)

    removeClasses(pageObj, 'page')

    let wrappedHtml = _wrapHtml(pageObj, currentIndex)

    return wrappedHtml
  }

  function _wrapHtml (pageObj, currentIndex) {
    const newWrapper = d.createElement('div')

    let classes = `wrapper ${parseInt(currentIndex) + 1}`

    classes += isEven(currentIndex) ? ' odd' : ' even'

    addClasses(newWrapper, classes)

    // newWrapper.setAttribute('data-page', parseInt(currentIndex) + 1)

    // Try :before :after pseudo elements instead.
    // newWrapper.innerHTML = `<div class="outer gradient"><h1> View[${parseInt(currentIndex) + 1}]  </h1></div>`

    newWrapper.appendChild(pageObj)

    return newWrapper
  }

  function _flipPage (pageNo) {
    _book.currentPage = pageNo

    _setView(_book.currentPage)

    _setRange(_book.currentPage)

    _printBook()
  }

  function _setView (currentPage = 1) {
    let currentIndex = parseInt(currentPage) - 1

    switch (_book.mode) {
      case 'portrait':
        _book.currentView = [`${currentPage}`]
        _book.viewablePages = [_book.pages[`${currentIndex}`]]
        break

      case 'landscape':
        if (isEven(parseInt(currentPage))) {
          /***
            @range = _book.pages.slice(P , Q) where:
                P & Q are integers
                P & Q may or may not lie in the range 0 < VALUES < 2N (_book.length)
          ***/

          let q = (parseInt(currentPage) + 1) > parseInt(_book.pages.length) ? 1 : (parseInt(currentPage) + 1) % parseInt(_book.pages.length)

          _book.currentView = [`${currentPage}`, `${q}`]
          _book.viewablePages = [_book.pages[`${currentIndex}`], _book.pages[`${q - 1}`]]
        } else {
          let p = (parseInt(currentPage) - 1) < 1 ? _book.pages.length : (parseInt(currentPage) - 1) % parseInt(_book.pages.length)

          _book.currentView = [`${p}`, `${currentPage}`]
          _book.viewablePages = [_book.pages[`${p - 1}`], _book.pages[`${currentIndex}`]]
        }

        break
    }
  }

  function _setRange (currentPage = 1) {
    let currentIndex = parseInt(currentPage) - 1

    /***
      @range = _book.pages.slice(P , Q) where:
        P, Q, R, S are integers
        P, Q, R, S may or may not lie in the range 0 < VALUES < 2N (_book.length)
    ***/

    switch (_book.mode) {
      case 'portrait':

        // let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
        // let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)
        // let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? (currentIndex + 1) - parseInt(_book.pages.length) : (currentIndex + 1)
        // let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)

        let p = _leftCircularIndex(currentIndex, 2)
        let q = _leftCircularIndex(currentIndex, 1)
        let r = _rightCircularIndex(currentIndex, 1)
        let s = _rightCircularIndex(currentIndex, 2)

        _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
        _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]

        break

      case 'landscape':
        if (isEven(parseInt(currentPage))) {
          // let p = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
          // let q = (currentIndex - 1 < 0) ? parseInt(_book.pages.length) + (currentIndex - 1) : (currentIndex - 1)
          // let r = (currentIndex + 2 >= parseInt(_book.pages.length)) ? (currentIndex + 2) - parseInt(_book.pages.length) : (currentIndex + 2)
          // let s = (currentIndex + 3 >= parseInt(_book.pages.length)) ? (currentIndex + 3) - parseInt(_book.pages.length) : (currentIndex + 3)

          let p = _leftCircularIndex(currentIndex, 2)
          let q = _leftCircularIndex(currentIndex, 1)
          let r = _rightCircularIndex(currentIndex, 2)
          let s = _rightCircularIndex(currentIndex, 3)

          _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
          _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]
        } else {
          // let p = (currentIndex - 3 < 0) ? parseInt(_book.pages.length) + (currentIndex - 3) : (currentIndex - 3)
          // let q = (currentIndex - 2 < 0) ? parseInt(_book.pages.length) + (currentIndex - 2) : (currentIndex - 2)
          // let r = (currentIndex + 1 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 1)
          // let s = (currentIndex + 2 >= parseInt(_book.pages.length)) ? currentIndex + 1 - parseInt(_book.pages.length) + 1 : (currentIndex + 2)

          let p = _leftCircularIndex(currentIndex, 3)
          let q = _leftCircularIndex(currentIndex, 2)
          let r = _rightCircularIndex(currentIndex, 1)
          let s = _rightCircularIndex(currentIndex, 2)

          _book.sidePagesLeft = [_book.pages[`${p}`], _book.pages[`${q}`]]
          _book.sidePagesRight = [_book.pages[`${r}`], _book.pages[`${s}`]]
        }

        break
    }
  }

  /***********************************
  *********** Print2DOM  *************
  ***********************************/

  function _printBook () {
    _printElements('buttons', _book.buttons)

    _printElements('view', _book.viewablePages)

    _printElements('rightPages', _book.sidePagesRight)

    _printElements('leftPages', _book.sidePagesLeft)

    _liveBook() // Set up events and state
  }

  function _printElements (type, elements) {
    const docfrag = d.createDocumentFragment()

    switch (type) {
      case 'buttons':
        elements.forEach(elem => {
          docfrag.appendChild(elem)
        })
        break
      case 'view':
        let pageList = elements.map((page, currentIndex) => {
          return _applyStyles(page, currentIndex, type)
        })

        pageList.forEach(page => {
          docfrag.appendChild(page)
        })

        break
      case 'rightPages':
        let rightPages = elements.map((page, currentIndex) => {
          return _applyStyles(page, currentIndex, type)
        })

        rightPages.forEach(page => {
          docfrag.appendChild(page)
        })

        break
      case 'leftPages':
        let leftPages = elements.map((page, currentIndex) => {
          return _applyStyles(page, currentIndex, type)
        })

        leftPages.forEach(page => {
          docfrag.appendChild(page)
        })

        break
    }
    _book.node.appendChild(docfrag)
  }

  function _applyStyles (pageObj, currentIndex, type) {
    let cssString = ''
    switch (_book.mode) {
      case 'portrait':
        switch (type) {
          case 'view':
            // inner
            cssString = 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center 0;'
            pageObj.childNodes[0].style = cssString
            // wrapper
            cssString = 'z-index: 2; float: left; left: 0;'
            pageObj.style.cssText = cssString
            break
          case 'rightPages':
            // inner
            cssString = 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center 0; visibility: hidden;'
            pageObj.childNodes[0].style = cssString
            // wrapper
            cssString = 'float: left; left: 0; pointer-events:none; visibility: hidden;'
            cssString += isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 0;'
            pageObj.style.cssText = cssString
            break
          case 'leftPages':
            // inner
            cssString = 'transform: translate3d(0, 0, 0) rotateY(-90deg) skewY(0deg); transform-origin: 0 center 0; visibility: hidden;'
            pageObj.childNodes[0].style = cssString
            // wrapper
            cssString = 'float: left; left: 0; pointer-events:none; visibility: hidden;'
            cssString += isEven(currentIndex) ? 'z-index: 1; ' : 'z-index: 0;'
            pageObj.style.cssText = cssString
            break
        }
        break
      case 'landscape':
        switch (type) {
          case 'view':
            cssString = isEven(currentIndex) ? 'pointer-events:none; transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 100% center;' : 'pointer-events:none; transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center;'
            pageObj.childNodes[0].style = cssString
            // wrapper
            cssString = 'z-index: 3; pointer-events:none;'
            cssString += isEven(currentIndex) ? 'float: left; left: 0;' : 'float: right; right: 0;'
            pageObj.style = cssString
            break
          case 'rightPages':
            // inner
            cssString = 'pointer-events:none;'
            cssString += isEven(currentIndex) ? 'transform: translate3d(0, 0, 0) rotateY(180deg) skewY(0deg); transform-origin: 100% center; visibility: hidden;' : 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 0 center; visibility: hidden;'
            pageObj.childNodes[0].style = cssString
            // wrapper
            cssString = 'pointer-events:none;'
            cssString += isEven(currentIndex) ? 'z-index: 2; float: left; left: 0; visibility: hidden;' : 'z-index: 1; float: right; right: 0; visibility: hidden;'
            pageObj.style.cssText = cssString
            break
          case 'leftPages':
            // inner
            cssString = 'pointer-events:none;'
            cssString += isEven(currentIndex) ? 'transform: translate3d(0, 0, 0) rotateY(0deg) skewY(0deg); transform-origin: 100% center; visibility: hidden;' : 'transform: translate3d(0, 0, 0) rotateY(-180deg) skewY(0deg); transform-origin: 0 center; visibility: hidden;'
            pageObj.childNodes[0].style = cssString

            // wrapper
            cssString = 'pointer-events:none;'
            pageObj.style.cssText = cssString
            cssString += isEven(currentIndex) ? 'z-index: 1; float: left; left: 0; visibility: hidden;' : 'z-index: 2; float: right; right: 0; visibility: hidden;'
            pageObj.style.cssText = cssString
            break
        }
    }

    return pageObj
  }

  function _removeElements (className) {
    _book.node.getElementsByClassName(className).remove()
  }

  /************************************
  *********** DOM/Manipulate **********
  *************************************/

  // function _next(increment) {
  //     // newCurrentPage = parseInt(_book.currentPage) + parseInt(increment)

  //     // console.log('newCurrentPage', newCurrentPage)
  // }

  // function _previous(increment) {
  //     // newCurrentPage = parseInt(_book.currentPage) + parseInt(increment)

  //     // console.log('newCurrentPage', newCurrentPage)
  // }

  /**********************************/
  /** ******* Events / Touch *********/
  /**********************************/

  let delegateElement = d.getElementById('plotter')

  let handler = (event) => {
    event.stopPropagation()

    event.preventDefault()

    switch (event.type) {
      case 'mouseover':
        _handleMouseOver(event)
        break
      case 'mouseout':
        _handleMouseOut(event)
        break
      case 'mousemove':
        _handleMouseMove(event)
        break
      case 'mousedown':
        _handleMouseDown(event)
        break
      case 'mouseup':
        _handleMouseUp(event)
        break
      case 'click':
        _handleMouseClicks(event)
        break
      case 'dblclick':
        _handleMouseDoubleClick(event)
        break
      case 'wheel':
        _handleWheelEvent(event)
        break
      case 'keydown':
        _handleKeyDownEvent(event)
        break
      case 'keypress':
        _handleKeyPressEvent(event)
        break
      case 'keyup':
        _handleKeyUpEvent(event)
        break
      case 'touchstart':
        _handleTouchStart(event)
        break
      case 'touchmove':
        _handleTouchMove(event)
        break
      case 'touchend':
        _handleTouchEnd(event)
        break
      default:
        console.log(event)
        break
    }
  }

  let mouseEvents = ['mousemove', 'mouseover', 'mousedown', 'mouseup', 'mouseout', 'click', 'dblclick', 'wheel']

  let touchEvents = ['touchstart', 'touchend', 'touchmove']

  let keyEvents = ['keypress', 'keyup', 'keydown']

  function _liveBook () {
    keyEvents.forEach(event => {
      w.addEventListener(event, handler)
    })

    w.addEventListener('mouseover', _applyBookEvents) // TODO: Optimization needed here.
    w.addEventListener('mouseout', _removeBookEvents)

    function _applyBookEvents () {
      mouseEvents.forEach(event => {
        delegateElement.addEventListener(event, handler)
      })
    }

    function _removeBookEvents () {
      mouseEvents.forEach(event => {
        delegateElement.removeEventListener(event, handler)
      })
    }

    if (isTouch()) {
      touchEvents.forEach(event => {
        delegateElement.addEventListener(event, handler)
      })
    }
  }

  /********************************/
  /** ********** Cone math *********/
  /********************************/

  const π = Math.PI

  // Definitions:
  // const quadrants = ['I', 'II', 'III', 'IV']
  // const direction = ['forward', 'backward']
  // μ = Mu = `x-distance` in pixels from origin of the book. (for mousePosition/touchPoint) 
  // ε = Epsilon = `y-distance` in pixels from origin of the book.
  // let Δ, θ, ω, Ω, α, β, δ = 0

  // Cone Angle λ (= )
  // function λ (angle) {

  // }

  /****************************************/
  /** ********** Event handlers ************/
  /****************************************/

  function _handleMouseOver (event) {
    if (!event.target) return

    console.log(_book.side)
  }

  function _handleMouseOut (event) {
    if (!event.target) return
    // TODO: This is where we calculate range pages according to QI-QIV.

    if (mouseDownOnPageDiv) {
      _attachSidePages(memory)
      _book.flippable = []
    }
  }

  function _handleMouseMove (event) {
    if (!event.target) return

    d.getElementById('xaxis').textContent = event.pageX
    d.getElementById('yaxis').textContent = event.pageY

    _book.side = ((event.pageX - _book.plotter.origin.x) > 0) ? 'right' : 'left'

    _book.region = ((event.pageY - _book.plotter.origin.y) > 0) ? 'lower' : 'upper'

    _book.plotter.currentPointerPosition = JSON.parse(`{ "x": "${event.pageX - _book.plotter.origin.x}", "y": "${event.pageY - _book.plotter.origin.y}" }`)

    _book.plotter.θ = Math.acos(parseInt(_book.plotter.currentPointerPosition.x) * 2 / parseInt(_book.plotter.bounds.width)) // θ in radians

    _book.plotter.μ = (2 / parseInt(_book.plotter.bounds.width) - parseInt(_book.plotter.currentPointerPosition.x)) / 2 // x-distance from origin.

    _book.plotter.ε = (2 / parseInt(_book.plotter.bounds.height) - parseInt(_book.plotter.currentPointerPosition.y)) / 2 // y-distance from origin.

    _book.plotter.quadrant = _book.side === 'right' ? (_book.region === 'upper') ? 'I' : 'IV' : (_book.region === 'upper') ? 'II' : 'III'

    if (_book.zoomed) {
      _book.node.style = `transform: scale3d(1.2, 1.2, 1.2) translate3d(${(_book.plotter.currentPointerPosition.x * -1) / 5}px, ${(_book.plotter.currentPointerPosition.y * -1) / 5}px, 0); backface-visibility: hidden; -webkit-filter: blur(0); will-change: transform; outline: 1px solid transparent; transition: all 500s;`
    }

    if (_book.isFlipping && event.target.nodeName !== 'A') {
      console.log(`rotateY(${_degrees(_book.plotter.θ)}deg)`)
      // console.log(`mu ${_book.plotter.μ}px`)
      // console.log(`epsilon ${_book.plotter.ε}px`)

      _book.node.getElementsByClassName(_book.flippable[0])[0].children[0].style.webkitTransform = `rotateY(${_degrees(_book.plotter.θ)}deg)`
      _book.node.getElementsByClassName(_book.flippable[1])[0].children[0].style.webkitTransform = `rotateY(${180 - _degrees(_book.plotter.θ)}deg)`
    }
  }

  function _handleMouseClicks (event) {
    if (!event.target) return

    event.preventDefault()

    // let currentIndex = parseInt(_book.currentPage) - 1

    switch (event.target.nodeName) {
      case 'A':
        // Cache multiple clicks for flipping animation?

        // switch (_book.mode) {
        //     case 'portrait':

        //         if (event.target.matches('a#next')) {
        //             let increment = 1 // Forward
        //             _book.currentPage = _rightCircularIndex(currentIndex, increment) + 1
        //         }

        //         if (event.target.matches('a#previous')) {
        //             let decrement = 1 // Backward
        //             _book.currentPage = _leftCircularIndex(currentIndex, decrement) + 1
        //         }
        //         break
        //     case 'landscape':
        //         if (event.target.matches('a#next')) {
        //             let increment = isEven(_book.currentPage) ? 2 : 1 // Forward
        //             _book.currentPage = _rightCircularIndex(currentIndex, increment) + 1
        //         }

        //         if (event.target.matches('a#previous')) {
        //             let decrement = isOdd(_book.currentPage) ? 2 : 1 // Backward
        //             _book.currentPage = _leftCircularIndex(currentIndex, decrement) + 1
        //         }
        //         break
        // }

        // console.log(_book.currentPage)

        // _removeChildren(_book.node)

        // _setView(_book.currentPage)

        // _setRange(_book.currentPage)

        // _printBook()

        break
      case 'DIV':
        break
      default:
    }
  }

  let [mouseDownOnPageDiv, memory] = [false]

  function _handleMouseDown (event) {
    if (!event.target) return

    switch (event.target.nodeName) {
      case 'A':
        mouseDownOnPageDiv = false
        console.log('Execute partial flipping')
        break
      case 'DIV':
        _book.isFlipping = true

        mouseDownOnPageDiv = true

        let currentIndex = parseInt(_book.currentPage) - 1

        let [displayableIndex, removableIndex] = []

        memory = _book.side

        switch (_book.side) {
          case 'left':
            switch (_book.mode) {
              case 'portrait':
                displayableIndex = [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]
                removableIndex = [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`]
                break
              case 'landscape':
                _book.node.getElementsByClassName(_book.currentView[0])[0].style.zIndex = 4
                _book.node.getElementsByClassName(_book.currentView[1])[0].style.zIndex = 1

                displayableIndex = isEven(currentIndex) ? [`${parseInt(_leftCircularIndex(currentIndex, 3)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]

                removableIndex = isEven(currentIndex) ? [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 3)) + 1}`]

                _book.flippable = [_book.currentView[0], `${isEven(currentIndex) ? parseInt(_leftCircularIndex(currentIndex, 2)) + 1 : parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]

                break
              default:
                break
            }
            break
          case 'right':
            switch (_book.mode) {
              case 'portrait':
                displayableIndex = [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`]
                removableIndex = [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]
                break
              case 'landscape':
                _book.node.getElementsByClassName(_book.currentView[0])[0].style.zIndex = 1
                _book.node.getElementsByClassName(_book.currentView[1])[0].style.zIndex = 4

                displayableIndex = isEven(currentIndex) ? [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 3)) + 1}`]
                removableIndex = isEven(currentIndex) ? [`${parseInt(_leftCircularIndex(currentIndex, 3)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]

                _book.flippable = [_book.currentView[1], `${isEven(currentIndex) ? parseInt(_rightCircularIndex(currentIndex, 1)) + 1 : parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`]

                break
              default:
                break
            }
            break
          default:
            break
        }

        displayableIndex.forEach(index => {
          _book.node.getElementsByClassName(index)[0].style.visibility = 'visible'
          _book.node.getElementsByClassName(index)[0].childNodes[0].style.visibility = 'visible'

          let ζ = null

          switch (memory) {
            case 'left':
              ζ = isOdd(parseInt(index)) ? 6 : 2
              break
            case 'right':
              ζ = isEven(parseInt(index)) ? 6 : 2
              break
            default:
              break
          }
          _book.node.getElementsByClassName(index)[0].style.zIndex = ζ
        })

        removableIndex.forEach(index => {
          _removeElements(index)
        })

        break
      default:
    }
  }

  function _handleMouseUp (event) {
    if (!event.target || !mouseDownOnPageDiv) return

    switch (event.target.nodeName) {
      case 'A':
        console.log('Click event is complete. Pass the buck around.')
        break
      case 'DIV':
        _book.isFlipping = false
        mouseDownOnPageDiv = false
        _attachSidePages(memory)
        _book.flippable = []
        break
      default:
    }
  }

  function _handleMouseDoubleClick (event) {
    if (!event.target || !_book.settings.zoom) return

    switch (event.target.nodeName) {
      case 'A':
        break
      case 'DIV':
        if (_book.zoomed) {
          _printElements('buttons', _book.buttons)
          _book.zoomed = false
          _book.node.style = 'transform: scale3d(1, 1, 1) translate3d(0, 0, 0); transition: all 100ms;'
        } else {
          _removeElements('classArrow-controls')
          _book.node.style = `transform: scale3d(1.2, 1.2, 1.2) translate3d(0, 0, 0); transition: all 100ms; will-change: transform;`
          _book.zoomed = true
        }

        break
      default:
    }
  }







  /* Don't worry about events below */
  function _handleWheelEvent (event) {
    // TODO: Determine forward / backward swipe.

    // console.log(event)
  }

  function _handleKeyPressEvent (event) {
    // console.log('pressed', event.keyCode)
  }

  function _handleKeyDownEvent (event) {
    // console.log('down', event.keyCode)
  }

  function _handleKeyUpEvent (event) {
    // console.log('up', event.keyCode)
  }

  function _handleTouchStart (event) {
    if (event.touches.length === 2) {
      _book.zoom = true
      // _pinchZoom(event, _book.zoom)
    }
    console.log(event.touches.length)
  }

  function _handleTouchMove (event) {
    // console.log('Touch moving')
  }

  function _handleTouchEnd (event) {
    // console.log('Touch moving')
  }

  /**********************************/
  /** ******* Transition ends *******/
  /**********************************/

  function _whichTransitionEvent () {
    let t
    const el = d.createElement('fakeelement')
    const transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t]
      }
    }
  }

  const transitionEvent = _whichTransitionEvent()

  transitionEvent && d.addEventListener(transitionEvent, (event) => {
    console.log('Transition Ended: Trigger `flipped`, `zoomed` events here')
  })

  /**********************************/
  /** ******* Behavior methods *******/
  /**********************************/

  // function _pinchZoom(event, zoom) {
  //     const fingerDistance =
  //         Math.sqrt(
  //             (event.touches[0].x - event.touches[1].x) * (event.touches[0].x - event.touches[1].x) +
  //             (event.touches[0].y - event.touches[1].y) * (event.touches[0].y - event.touches[1].y))

  //     console.log('distance', fingerDistance)

  // }

  function _attachSidePages (memory) {
    let currentIndex = parseInt(_book.currentPage) - 1
    let pageIndices = []

    switch (memory) {
      case 'left':
        _printElements('rightPages', _book.sidePagesRight)

        switch (_book.mode) {
          case 'portrait':
            pageIndices = [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]
            break
          case 'landscape':
            _book.node.getElementsByClassName(_book.currentView[0])[0].style.zIndex = 3
            _book.node.getElementsByClassName(_book.currentView[1])[0].style.zIndex = 3

            pageIndices = isEven(currentIndex) ? [`${parseInt(_leftCircularIndex(currentIndex, 3)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_leftCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_leftCircularIndex(currentIndex, 1)) + 1}`]
            break
          default:
            break
        }
        break
      case 'right':
        _printElements('leftPages', _book.sidePagesLeft)
        switch (_book.mode) {
          case 'portrait':
            pageIndices = [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`]

            break
          case 'landscape':
            _book.node.getElementsByClassName(_book.currentView[1])[0].style.zIndex = 3
            _book.node.getElementsByClassName(_book.currentView[0])[0].style.zIndex = 3

            pageIndices = isEven(currentIndex) ? [`${parseInt(_rightCircularIndex(currentIndex, 1)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`] : [`${parseInt(_rightCircularIndex(currentIndex, 2)) + 1}`, `${parseInt(_rightCircularIndex(currentIndex, 3)) + 1}`]

            break
          default:
            break
        }
        break
      case 'default':
        break
    }

    pageIndices.forEach(index => {
      _book.node.getElementsByClassName(index)[0].style.visibility = 'hidden'
      _book.node.getElementsByClassName(index)[0].childNodes[0].style.visibility = 'hidden'

      let ζ = null

      switch (memory) {
        case 'left':
          ζ = isOdd(parseInt(index)) ? 2 : 1
          break
        case 'right':
          ζ = isEven(parseInt(index)) ? 2 : 1
          break
        default:
          break
      }

      _book.node.getElementsByClassName(index)[0].style.zIndex = ζ
    })
  }

  /**********************************/
  /** ******* Helper methods *********/
  /**********************************/

  function isEven (n) {
    return n === parseFloat(n) ? !(n % 2) : void 0
  }

  function isOdd (n) {
    return Math.abs(n % 2) === 1
  }

  function isTouch () {
    return (('ontouchstart' in w) || (n.MaxTouchPoints > 0) || (n.msMaxTouchPoints > 0))
  }

  function _leftCircularIndex (currentIndex, indice) {
    return (parseInt(currentIndex) - parseInt(indice) < 0) ? parseInt(_book.pages.length) + (parseInt(currentIndex) - parseInt(indice)) : (parseInt(currentIndex) - parseInt(indice))
  }

  function _rightCircularIndex (currentIndex, indice) {
    return (parseInt(currentIndex) + parseInt(indice) >= parseInt(_book.pages.length)) ? (parseInt(currentIndex) + parseInt(indice)) - parseInt(_book.pages.length) : (parseInt(currentIndex) + parseInt(indice))
  }

  // function _radians (degrees) {
  //   return degrees / 180 * π
  // }

  function _degrees (radians) {
    return radians / π * 180
  }

  // function _getVendor (vendor = null) {
  //   const prefixes = ['Moz', 'Webkit', 'Khtml', 'O', 'ms']

  //   prefixes.forEach(prefix => {
  //     if (`${prefix}Transform` in d.body.style) { vendor = `-${prefix.toLowerCase()}-` }
  //   })
  //   return vendor
  // }

  // function increment(mode) {
  //     return (mode === 'portrait') ? 1 : 2
  // }

  // function direction(mode) {
  //     // return (mode === 'portrait') ? 'forward' : 'backward'
  // }

  /**********************************/
  /** ********** Polyfills ***********/
  /**********************************/

  DOMTokenList.prototype.addmany = function (classes) {
    let classArr = classes.split(' ')
    for (let i = 0; i < classArr.length; i++) {
      this.add(classArr[i])
    }
  }

  DOMTokenList.prototype.removemany = function (classes) {
    let classArr = classes.split(' ')
    for (let i = 0; i < classArr.length; i++) {
      this.remove(classArr[i])
    }
  }

  let addClasses = function (elem, classes) {
    elem.classList.addmany(classes)
  }

  let removeClasses = function (elem, classes) {
    elem.classList.removemany(classes)
  }

  Number.prototype.between = function (min, max) {
    return this > min && this < max
  }

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this)
  }

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i])
      }
    }
  }

  w.requestAnimationFrame = (() => {
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame || function (callback) { w.setTimeout(callback, 1E3 / 60) }
  })()

  /**********************************/
  /** ********* Exposed API **********/
  /**********************************/

  class Superbook {
    flippy (methodName, ...theArgs) {
      switch (methodName) {
        case 'length':
          return _book['getLength']()
        case 'mode':
          return _book['getMode']()
        case 'page':
          if (theArgs.length === 0) { return _book['page']() } else { _book['flipPage'](theArgs) }
          break
        default:
          return _book[methodName](theArgs)
      }
    }
  }

  // Putting superbook object in global namespace.
  if (typeof (w.Flippy) === 'undefined') {
    w.Flippy = {
      init (node, settings) {
        _init(node, settings)
        return new Superbook()
      }
    }
  }
}))(navigator, window, document)
